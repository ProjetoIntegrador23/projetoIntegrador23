// CÓDIGO DESENVOLVIDO NA FASE DE PROTOTIPAÇÃO DO PROJETO 

// #include <Wire.h>
// #include <LiquidCrystal_I2C.h>

// class SensorCorrente {
// public:
//   SensorCorrente(int pino) : pino_(pino) {
//     correnteMaxima_ = 5.0;  // Valor máximo de corrente suportado pelo sensor (em A)
//     valorCorrente_ = 0.0;
//     energiaConsumida_ = 0.0;
//     tempoInicial_ = millis();
//   }

//   void atualizarLeitura() {
//     // Leitura da corrente (em mV)
//     int leituraADC = analogRead(pino_);
//     // Converte a leitura para corrente (em A)
//     valorCorrente_ = (leituraADC / 1023.0) * correnteMaxima_;
    
//     // Calcula o tempo decorrido (em horas)
//     unsigned long tempoAtual = millis();
//     float tempoDecorridoHoras = (tempoAtual - tempoInicial_) / 3600000.0;  // 3600000 ms = 1 hora

//     // Calcula a energia consumida (em kWh)
//     energiaConsumida_ += (valorCorrente_ * tensaoAlimentacao_ * tempoDecorridoHoras) / 1000.0;  // Convertendo para kWh
//     tempoInicial_ = tempoAtual;  // Atualiza o tempo inicial
//   }

//   float getValorCorrente() {
//     return valorCorrente_;
//   }

//   float getEnergiaConsumida() {
//     return energiaConsumida_;
//   }

// private:
//   int pino_;
//   float correnteMaxima_;
//   float valorCorrente_;
//   float energiaConsumida_;
//   unsigned long tempoInicial_;
//   const float tensaoAlimentacao_ = 5.0;  // Tensão de alimentação do Arduino (em V)
// };

// class DisplayLCD {
// public:
//   DisplayLCD(int endereco, int colunas, int linhas)
//       : lcd_(endereco, colunas, linhas) {
//     lcd_.init();
//     lcd_.backlight();
//     lcd_.clear();
//   }

//   void exibirEnergiaConsumida(float energiaConsumida) {
//     lcd_.clear();
//     lcd_.setCursor(0, 0);
//     lcd_.print("Energia Consumida:");
//     lcd_.setCursor(0, 1);
//     lcd_.print(energiaConsumida, 2);
//     lcd_.print(" kWh");
//   }

// private:
//   LiquidCrystal_I2C lcd_;
// };

// class LED {
// public:
//   LED(int pino) : pino_(pino) {
//     pinMode(pino_, OUTPUT);
//     desligar();
//   }

//   void ligar() {
//     digitalWrite(pino_, HIGH);
//   }

//   void desligar() {
//     digitalWrite(pino_, LOW);
//   }

// private:
//   int pino_;
// };

// class Botao {
// public:
//   Botao(int pino) : pino_(pino) {
//     pinMode(pino_, INPUT_PULLUP);  // Usando resistor de pull-up interno
//     estadoAnterior_ = HIGH;
//     estadoAtual_ = HIGH;
//   }

//   bool estaPressionado() {
//     estadoAnterior_ = estadoAtual_;
//     estadoAtual_ = digitalRead(pino_);
//     return (estadoAnterior_ == HIGH && estadoAtual_ == LOW);
//   }

// private:
//   int pino_;
//   int estadoAnterior_;
//   int estadoAtual_;
// };

// // Pinos para o sensor de corrente, LCD, LED e botão
// const int pinoCorrenteSensor = A0;
// const int lcdAddr = 0x27;  // Endereço I2C do LCD
// const int lcdCols = 16;    // Número de colunas do LCD
// const int lcdRows = 2;     // Número de linhas do LCD
// const int ledPin = 13;
// const int botaoPin = 2;

// // Crie instâncias das classes SensorCorrente, DisplayLCD, LED e Botao
// SensorCorrente sensorCorrente(pinoCorrenteSensor);
// DisplayLCD display(lcdAddr, lcdCols, lcdRows);
// LED led(ledPin);
// Botao botao(botaoPin);

// void setup() {
//   // Inicialização do LCD e configuração inicial
//   display.exibirEnergiaConsumida(0.0);
  
//   // Inicialização do monitor serial para depuração
//   Serial.begin(9600);
// }

// void loop() {
//   // Verifique se o botão está pressionado
//   if (botao.estaPressionado()) {
//     // Inverta o estado do LED
//     if (digitalRead(ledPin) == LOW) {
//       led.ligar();
//       display.exibirEnergiaConsumida(sensorCorrente.getEnergiaConsumida());
//     } else {
//       led.desligar();
//       display.exibirEnergiaConsumida(sensorCorrente.getEnergiaConsumida());
//     }

//     // Aguarde um curto período de tempo para evitar detecção múltipla do botão
//     delay(100);
//   }

//   // Atualiza a leitura do sensor de corrente
//   sensorCorrente.atualizarLeitura();

//   // Monitor serial para depuração
//   Serial.print("Corrente (A): ");
//   Serial.println(sensorCorrente.getValorCorrente());
//   Serial.print("Energia Consumida (kWh): ");
//   Serial.println(sensorCorrente.getEnergiaConsumida());

//   delay(1000);
// }

             