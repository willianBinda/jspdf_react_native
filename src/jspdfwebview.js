import React, { useState, useRef } from "react";
import { Button, View } from "react-native";
import WebView from "react-native-webview";
import RNFS from 'react-native-fs'
import FileViewer from 'react-native-file-viewer'
import img from "./img"

export default () => {
    const [buttonClicked, setButtonClicked] = useState(false);
    const webViewRef = useRef(null);

    const handleWebViewMessage = (event) => {
        const data = event.nativeEvent.data;
        // console.log(data)
        if (buttonClicked) {
            const dir = RNFS.DocumentDirectoryPath + '/willian.pdf';

            RNFS.writeFile(dir, data, 'ascii')
                .then(() => {
                    FileViewer.open(dir);
                })
                .catch((error) => {
                    console.log('Erro ao escrever o arquivo:', error);
                });
        }
    };
    // const data = 
    const data = []

    var a = 0
    for (a; a < 100; a++) {
        data.push([
            '10/10/2023 - 10:10:10',
            "1",
            "2",
            "4",
            "3"
        ]);

    }
    // const date = '10/10/2023'
    // const iot = 'ufx7'
    // const username = 'willian'
    // const agrupamento = '1 hora'
    // const unidade = 'chapeco'
    // const tipolinha = 'tipolinha'
    // const numero_linha = '1'

    const htmlContent = `
    <html>
    <header>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.js"></script>
    </header>
    
    <body>
        <script>
            const gerarPDF = (data, date, username, unidade, numero_linha, tipo_linha, agrupamento, iot) => {
            

                var doc = new jsPDF('landscape');
    
                
    
    
                var totalPagesExp = '{total_pages_count_string}';
    
                doc.autoTable({
                    theme: 'grid',
                    margin: {
                        left: 20
                    },
                    headStyles: {
                        fillColor: [255, 255, 255],
                        textColor: 0,
                        halign: 'center',
                    },
                    alternateRowStyles: {
                        fillColor: [220, 220, 220],
                        textColor: 0,
                        halign: 'center',
                    },
                    columnStyles: {
                        0: {
                            halign: 'center',
                            cellWidth: 50,
                        },
                        1: {
                            halign: 'center',
                            cellWidth: 50,
                        },
                        2: {
                            halign: 'center',
                            cellWidth: 50,
                        },
                        3: {
                            halign: 'center',
                            cellWidth: 50,
                        },
                        4: {
                            halign: 'center',
                            cellWidth: 50,
                        }
                    },
                    head: [
                        [
                            {
                                content: '                               Relatório insensibilização - Tipo da linha: '+tipolinha+'                                   Nº da linha: '+numero_linha+' - Data da linha: '+date,
                                colSpan: 3,
                               
                            },
                            {
                                content: '                               Usuário logado: '+username+'                                Agrupamento:'+agrupamento,
                                colSpan: 2,
                            },
                        ],
                        [
                            {
                                content: 'Fluxo Equipamentos Industriais',
                                colSpan: 5,
                                styles: { fontSize: 15 },
                            }
                        ],
                        [{
                            content: 'Unidade: '+unidade,
                            colSpan: 5,
                            styles: { fontSize: 15 },
                        }],
                        [{
                            content: 'Equipamento: '+iot,
                            colSpan: 5,
                            styles: { fontSize: 15 },
                        }],
                        [
                            'Data - HH:MM:SS',
                            'Tensão (Volts - V)',
                            'Corrente (Ampère - A)',
                            'Frequência (Hertz - Hz)',
                            'Forma de onda'
                        ]
                    ],
                    body: data,
                    didDrawPage: function (data) {
                        doc.addImage('${img}', 'JPEG', 50, 30, 15, 10)
                        var str = 'Página ' + doc.internal.getNumberOfPages();
                        if (typeof doc.putTotalPages === 'function') {
                            str = 'Data de geração do relatório: '+date+' - ' + str + 'de' + totalPagesExp;
                        }
                        doc.setFontSize(10);
                        var pageSize = doc.internal.pageSize;
                        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                        doc.text(str, data.settings.margin.left, pageHeight - 10);
                    },
                });
    
                if (typeof doc.putTotalPages === 'function') {
                    doc.putTotalPages(totalPagesExp);
                }
    
                const pdfOutput = doc.output();
    
                window.ReactNativeWebView.postMessage(pdfOutput);
            };
        </script>
    </body>
    
    </html>
  `;

    const handleButtonClick = async () => {
        // const imagePath = RNFS.DocumentDirectoryPath + '/imagem.png';
        // console.log(imagePath)

        // const imageFile = await RNFS.readFile(img, 'base64');
        // const a = `data:image/jpeg;base64,${imageFile}`
        // console.log(a)



        setButtonClicked(true)
        const date = '10/10/2023'
        const username = 'willianbinda'
        const unidade = 'chapeco'
        const numero_linha = '5'
        const tipo_linha = 'tiponao'
        const agrupamento = '1 dia'
        const iot = 'ufx10'
        webViewRef.current.injectJavaScript(`gerarPDF('${JSON.stringify(data)},${date},${username},${unidade},${numero_linha},${tipo_linha},${agrupamento},${iot}');`);


    };

    return (
        <View>
            <WebView
                ref={webViewRef}
                source={{ html: htmlContent }}
                onMessage={handleWebViewMessage}
                javaScriptEnabled={true}
            />
            <Button
                title="gerarPDF"
                onPress={handleButtonClick}
            />
        </View>
    );
};


/*

<html>
  <header>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.js"></script>
  </header>
  
  <body>
      <script>
            const gerarPDF = ()=>{
              var doc = new jsPDF('landscape');
  
              const formatted_data = []
              const dados = [1, 2, 3, 4, 5]
              var a =0
              for( a;a<5;a++){
                  formatted_data.push([
                      '10/10/2023 - 10:10:10',
                      "1",
                      "2",
                      "4",
                      "3"
                  ]);

              }
              
  
              var totalPagesExp = '{total_pages_count_string}';
  
              doc.autoTable({
                  theme: 'grid',
                  margin: {
                      left: 20
                  },
                  headStyles: {
                      fillColor: [255, 255, 255],
                      textColor: 0,
                      halign: 'center',
                  },
                  alternateRowStyles: {
                      fillColor: [220, 220, 220],
                      textColor: 0,
                      halign: 'center',
                  },
                  columnStyles: {
                      0: {
                          halign: 'center',
                          cellWidth: 50,
                      },
                      1: {
                          halign: 'center',
                          cellWidth: 50,
                      },
                      2: {
                          halign: 'center',
                          cellWidth: 50,
                      },
                      3: {
                          halign: 'center',
                          cellWidth: 50,
                      },
                      4: {
                          halign: 'center',
                          cellWidth: 50,
                      }
                  },
                  head: [
                        [
                            {
                                content: '                               Relatório insensibilização - Tipo da linha: tipolinha                                   Nº da linha: 1 - Data da linha: 21-05-2023',
                                colSpan: 3,
                                styles:{halign:'center'}
                            },
                            {
                                content: '                               Usuário logado:willian                                 Agrupamento:1hora(s)',
                                colSpan: 2,
                            },
                        ],
                        [
                            {
                                content: 'Fluxo Equipamentos Industriais',
                                colSpan: 5,
                                styles: { fontSize: 15 },
                            }
                        ],
                        [{
                            content: 'Unidade: unidade1',
                            colSpan: 5,
                            styles: { fontSize: 15 },
                        }],
                        [{
                            content: 'Equipamento: ufx7',
                            colSpan: 5,
                            styles: { fontSize: 15 },
                        }],
                        [
                            'Data - HH:MM:SS',
                            'Tensão (Volts - V)',
                            'Corrente (Ampère - A)',
                            'Frequência (Hertz - Hz)',
                            'Forma de onda'
                        ]
                    ],
                  body: formatted_data,
                  didDrawPage: function (data) {
                      var str = 'Página ' + doc.internal.getNumberOfPages();
                      if (typeof doc.putTotalPages === 'function') {
                          str = 'Data de geração do relatório: 10/10/2023 - '+ str + 'de' + totalPagesExp;
                      }
                      doc.setFontSize(10);
                      var pageSize = doc.internal.pageSize;
                      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                      doc.text(str, data.settings.margin.left, pageHeight - 10);
                  },
              });
  
              if (typeof doc.putTotalPages === 'function') {
                  doc.putTotalPages(totalPagesExp);
              }
  
              const pdfOutput = doc.output();
            
              window.ReactNativeWebView.postMessage(pdfOutput);
          };
      </script>
  </body>
  
  </html>

*/