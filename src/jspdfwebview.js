import React, { useState, useRef } from "react";
import { Button, View } from "react-native";
import WebView from "react-native-webview";
import RNFS from 'react-native-fs'
import FileViewer from 'react-native-file-viewer'

export default () => {
    const [buttonClicked, setButtonClicked] = useState(false);
    const webViewRef = useRef(null);

    const handleWebViewMessage = (event) => {
        const data = event.nativeEvent.data;

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

    const htmlContent = `
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
                          '',
                          {
                              content: 'Relatório insensibilização - Linha 1 - 10/10/2023',
                              colSpan: 3
                          },
                          {
                              content: 'Usuário logado: willian',
                              colSpan: 1
                          }
                      ],
                      [
                          {
                              content: 'Fluxo Equipamentos Industriais',
                              colSpan: 5,
                              styles: { fontSize: 15 },
                          }
                      ],
                      [{
                          content: 'Unidade: chapeco',
                          colSpan: 5,
                          styles: { fontSize: 15 },
                      }],
                      [{
                          content: 'Equipamento: ufx7',
                          colSpan: 5,
                          styles: { fontSize: 15 },
                      }],
                      [
                          'Data - Hora',
                          'Forma de onda',
                          "Corrente (Ampère - A)",
                          "Frequência (Hertz - Hz)",
                          'Tensão (Volts - V)'
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
  `;

    const handleButtonClick = () => {
        setButtonClicked(true)
        webViewRef.current.injectJavaScript(`gerarPDF();`);


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