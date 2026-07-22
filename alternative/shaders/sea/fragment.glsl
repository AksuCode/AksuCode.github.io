varying float vHeight;

void main() {

    vec3 color = mix(
        vec3(0.1, 0.2, 0.8),
        vec3(0.9, 0.9, 1.0),
        (vHeight + 1.0) * 0.5
    );

    gl_FragColor = vec4(color, 1.0);
}