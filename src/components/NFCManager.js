// import { NfcManager, Ndef, NfcTech } from 'react-native-nfc-manager';

// // Khởi tạo và quản lý NFC
// export async function initNfc() {
//     try {
//         await NfcManager.start();
//         console.log('NFC initialized');
//     } catch (ex) {
//         console.warn(ex);
//         throw ex;
//     }
// }

// export async function readNdef() {
//     try {
//         await NfcManager.requestTechnology([NfcTech.Ndef]);
//         const tag = await NfcManager.getTag();
//         // Xử lý dữ liệu từ tag ở đây
//         return tag;
//     } catch (ex) {
//         // Xử lý lỗi khi đọc tag
//         console.warn(ex);
//         throw ex;
//     } finally {
//         NfcManager.cancelTechnologyRequest();
//     }
// }

// export async function writeNdef(url) {
//     try {
//         await NfcManager.requestTechnology([NfcTech.Ndef]);

//         const bytes = Ndef.encodeMessage([Ndef.uriRecord(url)]);
//         const result = await NfcManager.ndefHandler(bytes);

//         return result;
//     } catch (ex) {
//         console.warn(ex);
//         throw ex;
//     } finally {
//         NfcManager.cancelTechnologyRequest();
//     }
// }

// export async function stopNfc() {
//     try {
//         await NfcManager.stop();
//         console.log('NFC stopped');
//     } catch (ex) {
//         console.warn(ex);
//         throw ex;
//     }
// }
