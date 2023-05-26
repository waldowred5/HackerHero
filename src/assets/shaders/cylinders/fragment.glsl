varying vec3 vPosition;

uniform vec3 cylinderColor1;  // Blue color
uniform vec3 cylinderColor2;  // Red color
uniform vec3 cylinderColor3;  // Grey color
uniform float cylinderHeight;

void main() {
    // Calculate the normalized position along the height of the cylinder
    float t = clamp((vPosition.z + 0.5 * cylinderHeight) / cylinderHeight, 0.0, 1.0);

    float strength = mod(t, 1.0);
    strength = step(t * 0.5, strength);

    vec3 color;
    if (strength >= 0.5) {
        color = cylinderColor1;
    } else {
        color = cylinderColor2;
    }

    // Output the final color
    gl_FragColor = vec4(color, 1.0);
}
