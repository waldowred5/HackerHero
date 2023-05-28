varying vec3 vPosition;

uniform vec3 uCylinderColorBase;  // Grey color
uniform vec3 uCylinderColorPlayerOne;  // Blue color
uniform vec3 uCylinderColorPlayerTwo;  // Red color
uniform float uCylinderDistance;
uniform float uOwnershipPercentage;
uniform bool uDirectionToggle;

void main() {
    float ownerShipModifier = uDirectionToggle ? uOwnershipPercentage : (1.0 - uOwnershipPercentage);
    float t = clamp((vPosition.z + ownerShipModifier * uCylinderDistance) / uCylinderDistance, 0.0, 1.0);
    float strength = mod(t, 1.0);
    strength = step(t, strength);

    vec3 color;
    if (strength <= 0.5) {
        color = uDirectionToggle ? uCylinderColorPlayerOne : uCylinderColorBase;
    } else {
        color = uDirectionToggle ? uCylinderColorBase : uCylinderColorPlayerOne;
    }

    // Output the final color
    gl_FragColor = vec4(color, 1.0);
}
