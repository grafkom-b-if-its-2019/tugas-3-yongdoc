precision mediump float;

attribute vec2 vPosition;
uniform float theta;
uniform float scale;

void main() {
  // float vTheta = -atan(1.0,sqrt(3.0)) * 2.0;

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

  mat4 yrotate = mat4(
    cos(theta), 0.0, -sin(theta), 0.0,
    0.0, 1.0, 0.0, 0.0,
    sin(theta), 0.0, cos(theta), 0.0,
    0.0, 0.0, 0.0, 1.0
  );


  mat4 scaling = mat4(
    scale, 0.0, 0.0, 0.0,
    0.0, scale, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  // gl_Position = vec4(vPosition, 0.0, 1.0)*translasi;
  // gl_Position = vec4(vPosition, 0.0, 1.0)*zrotate;
  gl_Position = vec4(vPosition, 0.0, 1.0)*yrotate;
  // gl_Position = vec4(vPosition, 0.0, 1.0);
}