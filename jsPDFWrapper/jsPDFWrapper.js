// jsPDFWrapper.js
import { NativeModules } from 'react-native';

const { JsPdfModule } = NativeModules.JsPdfModule

export default {
  createPDF: async (content) => {
    try {
      const pdfBase64 = await JsPdfModule.createPDF(content);
      return pdfBase64;
    } catch (error) {
      console.error('Erro ao criar o PDF:', error);
      throw error;
    }
  },
};