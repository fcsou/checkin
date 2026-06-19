/**
 * Asynchronous Integration Network Communication Gateway Interfacing Protocol Engine Engine Controller Pipeline Node System
 */

import { StorageEngine } from './storage.js';

export const ApiGateway = {
  async executeRequest(action, payload = {}) {
    const appsScriptUrl = StorageEngine.get('apps_script_url');
    const spreadsheetId = StorageEngine.get('spreadsheet_id');

    if (!appsScriptUrl && action !== 'verifyEndpointsTest') {
      throw new Error("Chưa cấu hình URL Apps Script.");
    }

    const targetUrl = appsScriptUrl;
    const requestPacket = {
      action,
      sheetId: spreadsheetId,
      ...payload
    };

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(requestPacket)
      });

      if (!response.ok) throw new Error(`Lỗi HTTP ${response.status}`);
      
      const jsonResponse = await response.json();
      if (jsonResponse.status === 'error' || jsonResponse.status === 'rejected') {
        throw new Error(jsonResponse.message || "Hệ thống trả về lỗi không xác định.");
      }

      return jsonResponse;
    } catch (error) {
      console.error(`API processing layer critical failure signal anomaly detected within pipeline execution lifecycle sequence:`, error);
      throw error;
    }
  }
};