(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  var canvas = document.getElementById("glcanvas");
  var gl = glUtils.checkWebGL(canvas);

  var program1,program2;

  function main() {
    
    var tvertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var tfragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    program1 = glUtils.createProgram(gl, tvertexShader, tfragmentShader);

    var lvertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var lfragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
    program2 = glUtils.createProgram(gl, lvertexShader, lfragmentShader);
    
    render();
  }

  var theta_t = 0;
  var scale_t = 1;
  var check_t = 0;

  function triangle(){
    // Definisi vertex dan buffer
    var triangleVertices = [
      // x, y       r, g, b
      0.0,0.5,      0.0, 0.3, 1.0,
      0.0,-0.5,     0.0, 0.3, 1.0,
      0.1,0.7,      0.0, 0.8, 1.0,
      0.1,-0.5,     0.0, 0.8, 1.0,
      0.1,0.0,      0.0, 0.8, 1.0,
      0.1,0.2,      0.0, 0.8, 1.0,
      0.25,0.0,     0.0, 0.9, 1.0,
      0.35,0.2,     0.8, 0.9, 1.0,
      0.25,0.7,     0.0, 0.9, 1.0,
      0.35,0.7,     1.0, 1.0, 1.0,
    ];
    var tri = triangleVertices.length/5;
    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program1, 'vPosition');
    var vColor = gl.getAttribLocation(program1, 'vColor');

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    var thetaLoc = gl.getUniformLocation(program1, 'theta');
    var scaleLoc = gl.getUniformLocation(program1, 'scale');

    theta_t += Math.PI * 0.0001;
    
    if(scale_t<=-1){
      check_t=1;
    }else if(scale_t>=1){
      check_t=0;
      theta_t=0.005;
    }
    if(check_t==1){
      scale_t+=0.0256;
    }else {
      scale_t-=0.0256;
    }

    gl.uniform1f(thetaLoc, theta_t);
    gl.uniform1f(scaleLoc, scale_t);

    return tri;
  }

  var theta_l = 0,
      scale_l = 1;

  function line(){
    var lineVertices = [
      -0.35,0.7, -0.25,0.7,
      -0.25,0.2, -0.1,0.2,
      -0.1,0.7, -0.0,0.5,
      -0.0,-0.5, -0.1,-0.5,
      -0.1,0.0, -0.25,0.0,
      -0.35,0.2, -0.35,0.7
    ]
    var l=lineVertices.length/2;
    var lineVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,lineVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineVertices), gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation(program2, 'vPosition');
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(vPosition);

    var thetaLoc = gl.getUniformLocation(program2, 'theta');
    var scaleLoc = gl.getUniformLocation(program2, 'scale');

    theta_l += Math.PI * 0.0128;
    if(theta_l>Math.PI*2)theta_l=0;

    gl.uniform1f(thetaLoc, theta_l);
    gl.uniform1f(scaleLoc, scale_l);

    return l;
  }

  function render(){
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program1);
    var n = triangle();
    if(n<0){
      console.log("fail");
      return;
    }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

    gl.useProgram(program2);
    var m = line();
    if(m<0){
      console.log("fail");
      return;
    }
    gl.drawArrays(gl.LINE_STRIP, 0, m);

    requestAnimationFrame(render);
  }

})();
