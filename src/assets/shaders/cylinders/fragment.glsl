varying vec3 vPosition;

uniform vec3 cylinderColor1;  // Blue color
uniform vec3 cylinderColor2;  // Red color
uniform vec3 cylinderColor3;  // Grey color
uniform float cylinderHeight;
uniform float ownershipPercentage;
uniform bool directionToggle;

void main() {
    float ownerShipModifier = directionToggle ? ownershipPercentage : (1.0 - ownershipPercentage);
    float t = clamp((vPosition.z + ownerShipModifier * cylinderHeight) / cylinderHeight, 0.0, 1.0);
    float strength = mod(t, 1.0);
    strength = step(t, strength);

    vec3 color;
    if (strength <= 0.5) {
        color = directionToggle ? cylinderColor1 : cylinderColor2;
    } else {
        color = directionToggle ? cylinderColor2 : cylinderColor1;
    }

    // Output the final color
    gl_FragColor = vec4(color, 1.0);
}
