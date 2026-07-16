const canvas = document.getElementById("canvas");

if (!navigator.gpu) {
    throw new Error("WebGPU not supported.");
}

const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

const context = canvas.getContext("webgpu");
const format = navigator.gpu.getPreferredCanvasFormat();

function resize() {
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
}

resize();

context.configure({
    device,
    format,
    alphaMode: "opaque",
});

const cubeVertices = new Float32Array([
    // position           // color
    -1,-1, 1, 1,0,0,
     1,-1, 1, 0,1,0,
     1, 1, 1, 0,0,1,
    -1, 1, 1, 1,1,0,

    -1,-1,-1, 1,0,1,
     1,-1,-1, 0,1,1,
     1, 1,-1, 1,1,1,
    -1, 1,-1, 0,0,0,
]);

const cubeIndices = new Uint16Array([
    0,1,2, 0,2,3,
    1,5,6, 1,6,2,
    5,4,7, 5,7,6,
    4,0,3, 4,3,7,
    3,2,6, 3,6,7,
    4,5,1, 4,1,0
]);

const vertexBuffer = device.createBuffer({
    size: cubeVertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
});
device.queue.writeBuffer(vertexBuffer,0,cubeVertices);

const indexBuffer = device.createBuffer({
    size: cubeIndices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST
});
device.queue.writeBuffer(indexBuffer,0,cubeIndices);

const uniformBuffer = device.createBuffer({
    size: 64,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
});

const bindGroupLayout = device.createBindGroupLayout({
    entries: [{
        binding:0,
        visibility:GPUShaderStage.VERTEX,
        buffer:{}
    }]
});

const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [{
        binding:0,
        resource:{buffer:uniformBuffer}
    }]
});

const shader = device.createShaderModule({
code:`
struct Uniforms{
    mvp:mat4x4<f32>
}
@group(0) @binding(0)
var<uniform> uniforms:Uniforms;

struct VSOut{
    @builtin(position) Position:vec4<f32>,
    @location(0) color:vec3<f32>,
}

@vertex
fn vs(
    @location(0) pos:vec3<f32>,
    @location(1) color:vec3<f32>
)->VSOut{
    var out:VSOut;
    out.Position=uniforms.mvp*vec4(pos,1.0);
    out.color=color;
    return out;
}

@fragment
fn fs(@location(0) color:vec3<f32>)->@location(0) vec4<f32>{
    return vec4(color,1.0);
}
`
});

const pipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({
        bindGroupLayouts:[bindGroupLayout]
    }),
    vertex:{
        module:shader,
        entryPoint:"vs",
        buffers:[{
            arrayStride:24,
            attributes:[
                {shaderLocation:0,offset:0,format:"float32x3"},
                {shaderLocation:1,offset:12,format:"float32x3"},
            ]
        }]
    },
    fragment:{
        module:shader,
        entryPoint:"fs",
        targets:[{format}]
    },
    primitive:{
        topology:"triangle-list",
        cullMode:"back"
    },
    depthStencil:{
        depthWriteEnabled:true,
        depthCompare:"less",
        format:"depth24plus"
    }
});

let depthTexture;

function createDepthTexture(){
    depthTexture = device.createTexture({
        size:[canvas.width,canvas.height],
        format:"depth24plus",
        usage:GPUTextureUsage.RENDER_ATTACHMENT
    });
}
createDepthTexture();

function perspective(fov, aspect, near, far){
    const f=1/Math.tan(fov/2);
    return new Float32Array([
        f/aspect,0,0,0,
        0,f,0,0,
        0,0,(far+near)/(near-far),-1,
        0,0,(2*far*near)/(near-far),0
    ]);
}

function rotationY(a){
    const c=Math.cos(a), s=Math.sin(a);
    return new Float32Array([
         c,0,-s,0,
         0,1, 0,0,
         s,0, c,0,
         0,0,-4,1
    ]);
}

function multiply(a,b){
    const out=new Float32Array(16);
    for(let r=0;r<4;r++)
    for(let c=0;c<4;c++)
    for(let k=0;k<4;k++)
        out[r*4+c]+=a[r*4+k]*b[k*4+c];
    return out;
}

function frame(time){

    const proj=perspective(
        Math.PI/4,
        canvas.width/canvas.height,
        0.1,
        100
    );

    const model=rotationY(time*0.001);
    const mvp=multiply(proj,model);

    device.queue.writeBuffer(uniformBuffer,0,mvp);

    const encoder=device.createCommandEncoder();

    const pass=encoder.beginRenderPass({
        colorAttachments:[{
            view:context.getCurrentTexture().createView(),
            clearValue:{r:0.1,g:0.1,b:0.15,a:1},
            loadOp:"clear",
            storeOp:"store"
        }],
        depthStencilAttachment:{
            view:depthTexture.createView(),
            depthClearValue:1,
            depthLoadOp:"clear",
            depthStoreOp:"store"
        }
    });

    pass.setPipeline(pipeline);
    pass.setBindGroup(0,bindGroup);
    pass.setVertexBuffer(0,vertexBuffer);
    pass.setIndexBuffer(indexBuffer,"uint16");
    pass.drawIndexed(cubeIndices.length);
    pass.end();

    device.queue.submit([encoder.finish()]);

    requestAnimationFrame(frame);
}

window.addEventListener("resize",()=>{
    resize();
    context.configure({
        device,
        format,
        alphaMode:"opaque"
    });
    createDepthTexture();
});

requestAnimationFrame(frame);