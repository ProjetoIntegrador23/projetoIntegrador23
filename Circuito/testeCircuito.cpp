// // ========================================== CÓDIGO REFATORADO ==========================================

// // BIBLIOTECAS
// #include <WiFi.h>
// #include <IOXhop_FirebaseESP32.h>
// #include <FirebaseESP32.h>
// #include <ArduinoJson.h>

// // CONEXÃO DO WIFI
// #define WIFI_SSID "Pierri"
// #define WIFI_PASSWORD "pierrileo"

// // CONEXÃO COM O FIREBASE
// #define FIREBASE_HOST "https://meuconsumodeenergiaweb-default-rtdb.firebaseio.com/"
// #define FIREBASE_AUTH "7gWFUjxdr04ffmnQP9lCkfXn32sR8SoMnLUIgBUn"

// // CLASSES
// class SensorCorrente
// {
// private:
//     int pino_sensor;
//     int menor_valor;
//     int ZERO_SENSOR;

// public:
//     SensorCorrente(int pin) : pino_sensor(pin), menor_valor(4095), ZERO_SENSOR(0) {}

//     // AUTOZERO DO SENSOR
//     void autoZero()
//     {
//         Serial.println("Fazendo o Auto ZERO do Sensor...");
//         for (int i = 0; i < 10000; i++)
//         {
//             int valor_lido = analogRead(pino_sensor);
//             if (valor_lido < menor_valor)
//             {
//                 menor_valor = valor_lido;
//             }
//             delayMicroseconds(1);
//         }
//         ZERO_SENSOR = menor_valor;
//         Serial.print("Zero do Sensor: ");
//         Serial.println(ZERO_SENSOR);
//         delay(3000);
//     }

//     // MEDIR CORRENTE 
//     void medirCorrente()
//     {
//         int menor_valor_local = 4095;
//         for (int i = 0; i < 1600; i++)
//         {
//             int valor_lido = analogRead(pino_sensor);
//             if (valor_lido < menor_valor_local)
//             {
//                 menor_valor_local = valor_lido;
//             }
//             delayMicroseconds(10);
//         }
//         Serial.print("Menor Valor: ");
//         Serial.println(menor_valor_local);
//         float corrente_pico = ZERO_SENSOR - menor_valor;
//         corrente_pico = corrente_pico * 0.805;
//         corrente_pico = corrente_pico / 185;
//         Serial.print("Corrente de Pico: ");
//         Serial.print(corrente_pico);
//         Serial.print(" A");
//         Serial.print(" --- ");
//         Serial.print(corrente_pico * 1000);
//         Serial.println(" mA");
//         float corrente_eficaz = corrente_pico / 1.4;
//         Serial.print("Corrente Eficaz: ");
//         Serial.print(corrente_eficaz);
//         Serial.print(" A");
//         Serial.print(" --- ");
//         Serial.print(corrente_eficaz * 1000);
//         Serial.println(" mA");
//         delay(5000);

//         enviarDadosFirebase(corrente_pico, corrente_eficaz);
        
//         // Chame a função para validar o usuário
//         validarUsuario();
        
//           // Obtenha a data e hora atual (você precisará de uma maneira de obter isso na ESP32)
//     String dataHoraAtual = obterDataHoraAtual();

//     // Chame a função para enviar informações para o usuário validado
//     enviarInformacoesUsuario(usuarioValidadoID, corrente_pico, corrente_eficaz, dataHoraAtual);

//     delay(5000);
//     }

//     void enviarDadosFirebase(float correntePico, float correnteEficaz)
//     {
//         FirebaseJson json;
//         json.setFloat("correntePico", correntePico);
//         json.setFloat("correnteEficaz", correnteEficaz);

//         if (Firebase.set("/leituras", json))
//         {
//             Serial.println("Dados enviados com sucesso para o Firebase");
//         }
//         else
//         {
//             Serial.println("Falha ao enviar dados para o Firebase");
//             Serial.println(Firebase.error());
//         }

//         validarUsuario();
//     }

//     void validarUsuario()
//     {
//         // Obtém a lista de usuários do Firebase
//         FirebaseJson usuariosJson;
//         if (Firebase.get("/usuarios", usuariosJson))
//         {
//             for (int i = 0; i < usuariosJson.size(); i++)
//             {
//                 String usuarioID = usuariosJson[i]["ID"].asString();
//                 String enderecoMacUsuario = usuariosJson[i]["moduloWifi"]["enderecoMac"].asString();

//                 // Verifica se o endereço MAC da ESP32 é igual ao endereço MAC do usuário
//                 if (macAddressESP32.equals(enderecoMacUsuario))
//                 {
//                     Serial.println("Endereço MAC válido para o usuário: " + usuarioID);
//                      enviarInformacoesUsuario(usuarioID);
//                     break;  // Sai do loop assim que encontrar um usuário válido
//                 }
//             }
//         }
//         else
//         {
//             Serial.println("Falha ao obter a lista de usuários do Firebase");
//             Serial.println(Firebase.error());
//         }
//     }
// void enviarInformacoesUsuario(String usuarioID, float correntePico, float correnteEficaz, String dataHora)
// {
//     Serial.println("Enviando informações para o usuário: " + usuarioID);

//     // Crie um objeto FirebaseJson para armazenar os dados a serem enviados
//     FirebaseJson json;
//     json.setFloat("correntePico", correntePico);
//     json.setFloat("correnteEficaz", correnteEficaz);
//     json.setString("dataHora", dataHora);

//     // Construa o caminho no Firebase para enviar os dados ao usuário
//     String caminhoUsuario = "/usuarios/" + usuarioID + "/leituras";
    
//     // Use o método push para adicionar uma nova leitura ao nó "leituras" do usuário
//     String novoLeituraID = Firebase.push(caminhoUsuario, json);
    
//     if (Firebase.success())
//     {
//         Serial.println("Dados enviados com sucesso para o Firebase");
//         Serial.print("ID da nova leitura: ");
//         Serial.println(novoLeituraID);
//     }
//     else
//     {
//         Serial.println("Falha ao enviar dados para o Firebase");
//         Serial.println(Firebase.error());
//     }
// }


// };

// SensorCorrente sensorCorrente(36);

// void setup()
// {
//     Serial.begin(115200); // Inicializar console do arduino
//     Serial.println();

//     // Inicializar conexão com o wifi
//     WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
//     while (WiFi.status() != WL_CONNECTED)
//     {
//         Serial.print("Estabelecendo conexão com o WI-FI...");
//         delay(300);
//     }
//     Serial.println("Conectado ao WI-FI!");

//     Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH); // Inicializar conexão com o Firebase

//      sensorCorrente.autoZero(); //Inicializar o sensor de corrente
// }

// void loop()
// {
//     // RESGATAR TODAS AS INFORMAÇÕES DO BANCO DE DADOS DO FIREBASE 
//     Serial.print(Firebase.getString("/Usuario")); 

//     // SENSOR -  MEDIR CORRENTE
//     sensorCorrente.medirCorrente(); 

//     // OBTER DATA E HORA ATUAL
//     Serial.println(timeClient.getFormattedTime());

//     // OBTER ENDEREÇO MAC DA ESP32
//     String macAddress = WiFi.macAddress();
//     Serial.print("Endereço MAC: ");
//     Serial.println(macAddress);
//     delay(1000);

// }

// ========================================== CÓDIGO REFATORADO ==========================================


// // BIBLIOTECAS
// #include <WiFi.h>
// #include <FirebaseESP32.h>
// #include <IOXhop_FirebaseESP32.h>
// #include <ArduinoJson.h>

// // CONEXÃO DO WIFI
// #define WIFI_SSID "Pierri"
// #define WIFI_PASSWORD "pierrileo"

// // CONEXÃO COM O FIREBASE
// #define FIREBASE_HOST "https://meuconsumodeenergiaweb-default-rtdb.firebaseio.com/"
// #define FIREBASE_AUTH "7gWFUjxdr04ffmnQP9lCkfXn32sR8SoMnLUIgBUn"

// // CLASSES
// class SensorCorrente
// {
// private:
//     int pino_sensor;
//     int menor_valor;
//     int ZERO_SENSOR;

// public:
//     SensorCorrente(int pin) : pino_sensor(pin), menor_valor(4095), ZERO_SENSOR(0) {}

//     // AUTOZERO DO SENSOR
//     void autoZero()
//     {
//         Serial.println("Fazendo o Auto ZERO do Sensor...");
//         for (int i = 0; i < 10000; i++)
//         {
//             int valor_lido = analogRead(pino_sensor);
//             if (valor_lido < menor_valor)
//             {
//                 menor_valor = valor_lido;
//             }
//             delayMicroseconds(1);
//         }
//         ZERO_SENSOR = menor_valor;
//         Serial.print("Zero do Sensor: ");
//         Serial.println(ZERO_SENSOR);
//         delay(3000);
//     }

//     // MEDIR CORRENTE
//     void medirCorrente()
//     {
//         int menor_valor_local = 4095;
//         for (int i = 0; i < 1600; i++)
//         {
//             int valor_lido = analogRead(pino_sensor);
//             if (valor_lido < menor_valor_local)
//             {
//                 menor_valor_local = valor_lido;
//             }
//             delayMicroseconds(10);
//         }
//         Serial.print("Menor Valor: ");
//         Serial.println(menor_valor_local);
//         float corrente_pico = ZERO_SENSOR - menor_valor;
//         corrente_pico = corrente_pico * 0.805;
//         corrente_pico = corrente_pico / 185;
//         Serial.print("Corrente de Pico: ");
//         Serial.print(corrente_pico);
//         Serial.print(" A");
//         Serial.print(" --- ");
//         Serial.print(corrente_pico * 1000);
//         Serial.println(" mA");
//         float corrente_eficaz = corrente_pico / 1.4;
//         Serial.print("Corrente Eficaz: ");
//         Serial.print(corrente_eficaz);
//         Serial.print(" A");
//         Serial.print(" --- ");
//         Serial.print(corrente_eficaz * 1000);
//         Serial.println(" mA");
//         delay(5000);

//         enviarDadosFirebase(corrente_pico, corrente_eficaz);
//     }

//     void enviarDadosFirebase(float correntePico, float correnteEficaz)
//     {
//         // Crie um objeto FirebaseJson para armazenar os dados a serem enviados
//         FirebaseJson json;
//         json.setFloat("correntePico", correntePico);
//         json.setFloat("correnteEficaz", correnteEficaz);

//         if (Firebase.set("/leituras", json))
//         {
//             Serial.println("Dados enviados com sucesso para o Firebase");
//         }
//         else
//         {
//             Serial.println("Falha ao enviar dados para o Firebase");
//             Serial.println(Firebase.error());
//         }

//         validarUsuario();
//     }

//     void validarUsuario()
//     {
//         // Obtém a lista de usuários do Firebase
//         FirebaseJson usuariosJson;
//         if (Firebase.get("/usuarios", usuariosJson))
//         {
//             for (int i = 0; i < usuariosJson.size(); i++)
//             {
//                 String usuarioID = usuariosJson[i]["ID"].asString();
//                 String enderecoMacUsuario = usuariosJson[i]["moduloWifi"]["enderecoMac"].asString();

//                 // Verifica se o endereço MAC da ESP32 é igual ao endereço MAC do usuário
//                 if (macAddressESP32.equals(enderecoMacUsuario))
//                 {
//                     Serial.println("Endereço MAC válido para o usuário: " + usuarioID);
//                     enviarInformacoesUsuario(usuarioID);
//                     break; // Sai do loop assim que encontrar um usuário válido
//                 }
//             }
//         }
//         else
//         {
//             Serial.println("Falha ao obter a lista de usuários do Firebase");
//             Serial.println(Firebase.error());
//         }
//     }

//     void enviarInformacoesUsuario(String usuarioID)
//     {
//         // Obtenha a data e hora atual (você precisará de uma maneira de obter isso na ESP32)
//         String dataHoraAtual = obterDataHoraAtual();

//         // Crie um objeto FirebaseJson para armazenar os dados a serem enviados
//         FirebaseJson json;
//         json.setFloat("correntePico", correntePico);
//         json.setFloat("correnteEficaz", correnteEficaz);
//         json.setString("dataHora", dataHoraAtual);

//         // Construa o caminho no Firebase para enviar os dados ao usuário
//         String caminhoUsuario = "/usuarios/" + usuarioID + "/leituras";

//         // Use o método push para adicionar uma nova leitura ao nó "leituras" do usuário
//         String novoLeituraID = Firebase.push(caminhoUsuario, json);

//         if (Firebase.success())
//         {
//             Serial.println("Dados enviados com sucesso para o Firebase");
//             Serial.print("ID da nova leitura: ");
//             Serial.println(novoLeituraID);
//         }
//         else
//         {
//             Serial.println("Falha ao enviar dados para o Firebase");
//             Serial.println(Firebase.error());
//         }
//     }
// };

// SensorCorrente sensorCorrente(36);

// void setup()
// {
//     Serial.begin(115200); // Inicializar console do Arduino
//     Serial.println();

//     // Inicializar conexão com o WiFi
//     WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
//     while (WiFi.status() != WL_CONNECTED)
//     {
//         Serial.print("Estabelecendo conexão com o Wi-Fi...");
//         delay(300);
//     }
//     Serial.println("Conectado ao Wi-Fi!");

//     Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH); // Inicializar conexão com o Firebase

//     sensorCorrente.autoZero(); // Inicializar o sensor de corrente
// }

// void loop()
// {
//     // Sensor - Medir Corrente
//     sensorCorrente.medirCorrente();

//     delay(5000); // Atraso entre leituras
// }
