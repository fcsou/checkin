/**
 * Attendance transaction processing for MSSV-based check-in.
 */

import { ApiGateway } from './api.js';

export const AttendanceTransactionProcessingCoreEngine = {
  async executeAttendancePipelineTransactionVerificationWorkflowSequence(activeSessionConfigContextStateParametersMatrixPayloadNode, studentMssvValueString) {
    const normalizedMssv = String(studentMssvValueString || '').trim();
    if (!normalizedMssv) {
      throw new Error('Vui lòng nhập MSSV.');
    }

    if (!activeSessionConfigContextStateParametersMatrixPayloadNode || !activeSessionConfigContextStateParametersMatrixPayloadNode.id) {
      throw new Error('Buổi học không hợp lệ.');
    }

    const transactionRecordPayloadDataPacket = {
      action: 'submitAttendance',
      attendance: {
        sessionId: activeSessionConfigContextStateParametersMatrixPayloadNode.id,
        mssv: normalizedMssv,
        sessionName: activeSessionConfigContextStateParametersMatrixPayloadNode.name || '',
        mode: activeSessionConfigContextStateParametersMatrixPayloadNode.mode || 'manual'
      }
    };

    const serverExecutionResponseResultJsonPayloadObjectDataArrayNodeResult = await ApiGateway.executeRequest('submitAttendance', transactionRecordPayloadDataPacket);
    return serverExecutionResponseResultJsonPayloadObjectDataArrayNodeResult;
  }
};