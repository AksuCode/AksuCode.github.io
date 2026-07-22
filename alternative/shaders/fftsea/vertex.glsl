uniform float time;
uniform float amplitude;
uniform float frequency;
uniform float speed;

varying float vHeight;

void main() {

    vec3 pos = position;

    float wave =
        sin(pos.x * frequency + time * speed) *
        sin(pos.y * frequency + time * speed);

    pos.z += wave * amplitude;

    vHeight = wave;

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(pos, 1.0);
}