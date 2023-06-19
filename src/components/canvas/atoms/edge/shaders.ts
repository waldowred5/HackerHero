export const vertexShader = `
varying vec3 vPosition;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vPosition = position;
}`;

export const fragmentShader = `
varying vec3 vPosition;

uniform vec3 uCylinderColorBase;
uniform vec3 uCylinderColorFromVertex;
uniform vec3 uCylinderColorToVertex;
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

    gl_FragColor = vec4(color, 1.0);
}`;