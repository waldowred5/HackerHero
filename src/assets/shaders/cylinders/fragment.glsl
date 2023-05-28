varying vec3 vPosition;

uniform vec3 uCylinderColorBase;  // Grey color
uniform vec3 uCylinderColorFromVertex;  // Blue color
uniform vec3 uCylinderColorToVertex;  // Red color
uniform float uCylinderDistance;
uniform float uFromVertexOwnershipPercentage;
uniform float uToVertexOwnershipPercentage;

void main() {
    float fromVertexOwnershipModifier = uFromVertexOwnershipPercentage;
    float toVertexOwnershipModifier = (1.0 - uToVertexOwnershipPercentage);
    float fromVertexValue = clamp((vPosition.z + fromVertexOwnershipModifier * uCylinderDistance) / uCylinderDistance, 0.0, 1.0);
    float toVertexValue = clamp((vPosition.z + toVertexOwnershipModifier * uCylinderDistance) / uCylinderDistance, 0.0, 1.0);
    float thresholdOne = mod(fromVertexValue, 1.0);
    float thresholdTwo = mod(toVertexValue, 1.0);
    thresholdOne = step(fromVertexValue, thresholdOne);
    thresholdTwo = step(toVertexValue, thresholdTwo);

    vec3 color;
    if (thresholdOne <= 0.5) {
        color = uCylinderColorFromVertex;
    } else if (thresholdTwo >= 0.5) {
        color = uCylinderColorToVertex;
    } else {
        color = uCylinderColorBase;
    }

    // Output the final color
    gl_FragColor = vec4(color, 1.0);
}
