let raio = 0, xc = 0, yc = 0;
const t_pixel = 25;
const c = 600;
let mode = false;
let raio_input, menu, circ;
function setup() {
  const canvas = createCanvas(c, c);
  canvas.position(0, 30);
  raio_input = createInput().attribute('placeholder', 'raio');
  
  menu = createSelect();
  menu.option('Equação Paramétrica');
  menu.option('Incremental com Simetria');
  menu.option('Bresenham');
}
//funcao que simula um pixel
function pixel( A, B){
  // t_pixel é o tamanho do pixel
  A = round(A) * t_pixel;
  B = round(B) * t_pixel;
  fill(100);
  rect(A, B, t_pixel, t_pixel);
}

function parametrica(){
  let x = xc + raio;
  let y = yc;
  for(let t = 1; t <= 360; t ++){
    pixel(x, y);
    x =  xc + raio * cos(PI * t / 180);
    y =  yc + raio * sin(PI * t / 180);
  }
}
function pixel_octante(a, b){
  pixel(xc + a, yc + b);
  pixel(xc + a, yc - b);
  pixel(xc - a, yc + b);
  pixel(xc - a, yc - b);
  pixel(xc + b, yc + a);
  pixel(xc + b, yc - a);
  pixel(xc - b, yc + a);
  pixel(xc - b, yc - a);
}

function simetria(){
  let theta = 1 / raio;
  let cos_theta =  cos(theta);
  let sin_theta = sin(theta);
  let x = 0;
  let y = raio;
  let X, Y;
  while(x <= y){
    pixel_octante(x, y);
    X = x * cos_theta - y * sin_theta;
    Y = y * cos_theta + x * sin_theta;
    x = X; y = Y;
  }
}

function bresenham(){
  let x = 0;
  let y = raio;
  
  let p = 1 - raio;
  
  while(x <= y){
    pixel_octante(x, y);
    if(p >= 0){
      y -= 1;
      p += 2 * x - 2 * y + 5;
    }
    else{
      p += 2 * x + 3;
    }
    x ++;
  }
}

function draw() {
  background(220);
  text( "(" + round(mouseX/t_pixel) +", " + round(mouseY/t_pixel) + ")", 0, 10);
  if(mode == true){
    if(raio_input.value() != "")
      raio = parseInt(raio_input.value(), 10);
    if(circ == 'Equação Paramétrica')
      parametrica();
    if(circ == 'Incremental com Simetria')
      simetria();
    if(circ == 'Bresenham')
      bresenham();
  }
}

function mouseClicked() {
  if(mouseY >= 0){
    xc = round(mouseX/t_pixel); yc = round(mouseY/t_pixel);
    mode = true;
  }
  circ = menu.value();
  //print(xc, yc);
  redraw();
}
