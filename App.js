import React from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import RNFS, { downloadFile } from 'react-native-fs'
import FileViewer from 'react-native-file-viewer'

export default () => {

  const handleWebViewMessage = (event) => {

    const data = event.nativeEvent.data

    const dir = RNFS.DocumentDirectoryPath + '/willian.pdf';

    RNFS.writeFile(dir, data, 'ascii').then(() => {
      FileViewer.open(dir);
    }).catch((error) => {
      console.log('Erro ao escrever o arquivo:', error);
    });

  };

  const htmlContent = `
  <html>
  <header>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.js"></script>
  </header>
  
  <body>
      <button id="generatePdfButton" style="width:100%;height:200px;background-color: red;font-size: 50px;">Gerar
          PDF</button>
      <script>
          document.getElementById("generatePdfButton").addEventListener("click", function () {
              var doc = new jsPDF('landscape');
  
              const formatted_data = []
              const dados = [1, 2, 3, 4, 5]
              dados.forEach(e => {
                  formatted_data.push([
                      '10/10/2023 - 10:10:10',
                      "1",
                      "2",
                      "4",
                      "3"
                  ]);
              });
  
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
          });
      </script>
  </body>
  
  </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ html: htmlContent }}
        onMessage={handleWebViewMessage}
      />
    </View>
  );
};

/*
`
  <html>
<header>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/2.3.2/jspdf.plugin.autotable.js"></script>
</header>

<body>
    <button id="generatePdfButton" style="width:100%;height:200px;background-color: red;font-size: 50px;">Gerar PDF</button>
    <script>
        document.getElementById("generatePdfButton").addEventListener("click", function () {
            var doc = new jsPDF('landscape');

            const columns = ["Column 1", "Column 2", "Column 3"];
            const data = [
                ["Row 1 Data 1", "Row 1 Data 2", "Row 1 Data 3"],
                ["Row 2 Data 1", "Row 2 Data 2", "Row 2 Data 3"],
                ["Row 3 Data 1", "Row 3 Data 2", "Row 3 Data 3"],
            ];

            doc.autoTable(columns, data);   
            const pdfOutput = doc.output();
          
            window.ReactNativeWebView.postMessage(pdfOutput);
        });
    </script>
</body>

</html>
  `
*/