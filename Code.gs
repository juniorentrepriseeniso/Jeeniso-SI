const FOLDER_ID = '1H8f8yivAWGlmw8T3-dA2abJu-qpe5KU3';
function doPost(e) {
  try {
    const p = JSON.parse(e.postData.contents);
    const blob = Utilities.newBlob(Utilities.base64Decode(p.data), 'image/jpeg',
      Utilities.formatDate(new Date(), 'Africa/Tunis', 'yyyyMMdd-HHmmss') + '_' + p.name);
    DriveApp.getFolderById(FOLDER_ID).createFile(blob);
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// Test : ouvre l'URL /exec dans un navigateur, tu dois voir "OK"
function doGet() { return ContentService.createTextOutput('OK'); }

function testDrive() {
  DriveApp.getFolderById(FOLDER_ID).createFile('test.txt', 'ça marche');
}