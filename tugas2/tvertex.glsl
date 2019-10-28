precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;
uniform float scale;

void main() {

  mat4 translasi = mat4(
    1.0, 0.0, 0.0, 0.5,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 zrotate = mat4(
    cos(theta), -sin(theta), 0.0, 0.0,
    sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 scaling = mat4(
    scale, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  fColor = vColor;
  // gl_Position = vec4(vPosition, 0.0, 1.0)*translasi;
  // gl_Position = vec4(vPosition, 0.0, 1.0)*zrotate;
  gl_Position = vec4(vPosition, 0.0, 1.0)*scaling;
  // gl_Position = vec4(vPosition, 0.0, 1.0);
}
