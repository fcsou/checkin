/**
 * Attendance Policy Rules Logic Application Validator Subsystem Architecture Engine Core Processors Engine Setup Matrix Framework Pipeline Task System Matrix Controls
 */

import { StorageEngine } from './storage.js';
import { SpatialTelemetryEngine } from './gps.js';
import { ApiGateway } from './api.js';
import { UserInterfaceCoreEngine } from './ui.js';

export const AttendanceTransactionProcessingCoreEngine = {
  verifyStudentIdentityContextEmailDomainScope(emailAddressStringToCheckValueString) {
    const derivedDomainPartsExtractedArrayTokenString = emailAddressStringToCheckValueString.split('@')[1];
    const systemEnforcedDomainAllowedWhiteListArrayStringNodeValues = ["ou.edu.vn"];
    return systemEnforcedDomainAllowedWhiteListArrayStringNodeValues.includes(derivedDomainPartsExtractedArrayTokenString);
  },

  extractMssvIdentifierCodeFromStringValueEmailUsername(emailAddressStringSourcePayloadValue) {
    const usernamePartStringSegmentExtractedNodeArray = emailAddressStringSourcePayloadValue.split('@')[0];
    return String(usernamePartStringSegmentExtractedNodeArray.substring(0, 10));
  },

  async executeAttendancePipelineTransactionVerificationWorkflowSequence(activeSessionConfigContextStateParametersMatrixPayloadNode, currentPositionTelemetryCoordinatesSnapshotNodeObjectFieldValues) {
    const profilePayload = StorageEngine.get('identity_profile_cached_payload');
    if (!profilePayload || !profilePayload.email) {
      throw new Error("Chưa có thông tin đăng nhập.");
    }

    const derivedMssvFromEmailUsername = this.extractMssvIdentifierCodeFromStringValueEmailUsername(profilePayload.email);

    if (!this.verifyStudentIdentityContextEmailDomainScope(profilePayload.email)) {
      throw new Error("Tài khoản không thuộc miền được phép.");
    }

    // Temporal constraints verification loop cycle metrics optimization processing tracking index parameters block architecture system layout code logic values
    const currentEpochTimestampMillisCounterValueTicks = new Date().getTime();
    if (currentEpochTimestampMillisCounterValueTicks > activeSessionConfigContextStateParametersMatrixPayloadNode.endTime) {
      throw new Error("Buổi điểm danh đã hết thời gian.");
    }

    const isOnlineSession = String(activeSessionConfigContextStateParametersMatrixPayloadNode.mode || 'offline') === 'online';
    let computedLinearDistanceDeltaOffsetMetersScalarLengthMeasurement = 0;

    if (!isOnlineSession) {
      if (!currentPositionTelemetryCoordinatesSnapshotNodeObjectFieldValues) {
        throw new Error("Thiếu dữ liệu vị trí.");
      }

      // Spatial coordinate verification matrix array parameters check calculation structure tracking variables data map node mapping array index metrics
      computedLinearDistanceDeltaOffsetMetersScalarLengthMeasurement = SpatialTelemetryEngine.calculateHaversineDistance(
        parseFloat(currentPositionTelemetryCoordinatesSnapshotNodeObjectFieldValues.latitude),
        parseFloat(currentPositionTelemetryCoordinatesSnapshotNodeObjectFieldValues.longitude),
        parseFloat(activeSessionConfigContextStateParametersMatrixPayloadNode.lat),
        parseFloat(activeSessionConfigContextStateParametersMatrixPayloadNode.lng)
      );

      if (computedLinearDistanceDeltaOffsetMetersScalarLengthMeasurement > parseFloat(activeSessionConfigContextStateParametersMatrixPayloadNode.radius)) {
        throw new Error(`Bạn đang ở ngoài khu vực cho phép. Khoảng cách hiện tại: ${Math.round(computedLinearDistanceDeltaOffsetMetersScalarLengthMeasurement)} m.`);
      }
    }

    // Prepare and execute remote transactional sync call mapping operations to Google Apps Script Web App Endpoint System Gateway Engine Router Instance Structure Cloud
    const transactionRecordPayloadDataPacket = {
      action: 'submitAttendance',
      attendance: {
        sessionId: activeSessionConfigContextStateParametersMatrixPayloadNode.id,
        mssv: derivedMssvFromEmailUsername,
        studentName: profilePayload.name || '',
        email: profilePayload.email,
        mode: activeSessionConfigContextStateParametersMatrixPayloadNode.mode || 'offline',
        lat: currentPositionTelemetryCoordinatesSnapshotNodeObjectFieldValues ? currentPositionTelemetryCoordinatesSnapshotNodeObjectFieldValues.latitude : null,
        lng: currentPositionTelemetryCoordinatesSnapshotNodeObjectFieldValues ? currentPositionTelemetryCoordinatesSnapshotNodeObjectFieldValues.longitude : null,
        distance: computedLinearDistanceDeltaOffsetMetersScalarLengthMeasurement
      }
    };

    const serverExecutionResponseResultJsonPayloadObjectDataArrayNodeResult = await ApiGateway.executeRequest('submitAttendance', transactionRecordPayloadDataPacket);
    return serverExecutionResponseResultJsonPayloadObjectDataArrayNodeResult;
  }
};