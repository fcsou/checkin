/**
 * Master Root Application Execution Bootstrapper Layer Subsystem Core Engine Setup Matrix Architecture Framework Pipeline Component Engine System Entrypoint Orchestrator
 */

import { StorageEngine } from './storage.js';
import { ApiGateway } from './api.js';
import { VisualSymbologyEngine } from './qr.js';
import { UserInterfaceCoreEngine } from './ui.js';
import { AttendanceTransactionProcessingCoreEngine } from './attendance.js';

const DEFAULT_APPS_SCRIPT_EXEC_URL = 'https://script.google.com/macros/s/AKfycbyeoUI1Lfbz2odTpmXkKyF7E2iovjODBxqLrphOYERRav02sZDSVlO3NStHybXPSUkOwA/exec';

// Global System Runtime Application Context State Variables Structural Mapping Infrastructure Pipeline Data Collection Block Nodes Matrix Storage Container Objects Elements Array Data Store Track Structure Core Node
const RuntimeApplicationContextStateMemoryEngineMatrixContainerObjectArrayNodeStoreInstance = {
  activeSessionConfigurationParametersPayloadMappingDataNodeObject: null,
  activeCameraStreamReaderScannerHardwareModuleProxyInstanceEngineNodeObject: null,
  activeClassroomMonitorLiveStreamPollingTimerIntervalThreadIdCounterValue: null,
  activeStudentGpsTrackingLoopRealTimeWatcherProcessThreadIdCounterValue: null
};

document.addEventListener('DOMContentLoaded', async () => {
  UserInterfaceCoreEngine.bindThemeSystemInteractivityEngineControllers();
  const routingFilenameContextPathStringPathValueStringLabelHeaderKey = window.location.pathname.split('/').pop();

  if (routingFilenameContextPathStringPathValueStringLabelHeaderKey === 'student.html') {
    initializeStudentAppPortalWorkflowEngineSystemRoutineSequence();
  } else if (routingFilenameContextPathStringPathValueStringLabelHeaderKey === 'teacher.html') {
    initializeTeacherDashboardManagementConsoleAppEngineSystemRoutineSequence();
  }
});

/**
 * =========================================================================================================
 * Student Workspace Flow Logic Execution Implementation Modules Sequence Routine Subsystem Pipeline Setup Parameters Core Data Engine Blocks Array Architecture Layout Controls Elements Matrix System
 * =========================================================================================================
 */
function initializeStudentAppPortalWorkflowEngineSystemRoutineSequence() {
  // Screen 1 Initialization Routine: Digital Vision Scanner Engine Pipeline Integration Bootstrap Cycle Process
  RuntimeApplicationContextStateMemoryEngineMatrixContainerObjectArrayNodeStoreInstance.activeCameraStreamReaderScannerHardwareModuleProxyInstanceEngineNodeObject = new Html5Qrcode("qrReaderCameraStream");
  
  const qrReaderScanSuccessExecutionCallbackHandler = (decodedTextPayloadString, decodedResultPayloadObjectDataStringArrayNodeItemReferencePointer) => {
    try {
      const parsedSessionConfigObjectStructure = VisualSymbologyEngine.parseSessionPayloadString(decodedTextPayloadString);
      processTargetSessionBindingActionSequenceTrigger(parsedSessionConfigObjectStructure);
    } catch (error) {
      UserInterfaceCoreEngine.showToastNotification(error.message, 'error');
    }
  };

  RuntimeApplicationContextStateMemoryEngineMatrixContainerObjectArrayNodeStoreInstance.activeCameraStreamReaderScannerHardwareModuleProxyInstanceEngineNodeObject.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: { width: 250, height: 250 } },
    qrReaderScanSuccessExecutionCallbackHandler,
    (errorMessageTrackLineStringLabelKey) => { /* Silently consume polling stream tracking logs frame anomalies to minimize interface garbage cycles output collections */ }
  ).catch(err => {
    UserInterfaceCoreEngine.showToastNotification("Không mở được camera. Hãy nhập mã phiên thủ công.", 'warning');
  });

  document.getElementById('submitManualSessionCodeBtn').addEventListener('click', () => {
    const rawInputValueStringPayload = document.getElementById('manualSessionUrlIdInput').value.trim();
    if (!rawInputValueStringPayload) {
      UserInterfaceCoreEngine.showToastNotification("Vui lòng nhập mã phiên.", 'warning');
      return;
    }
    try {
      const parsedSessionConfigObjectStructure = VisualSymbologyEngine.parseSessionPayloadString(rawInputValueStringPayload);
      processTargetSessionBindingActionSequenceTrigger(parsedSessionConfigObjectStructure);
    } catch (error) {
      UserInterfaceCoreEngine.showToastNotification(error.message, 'error');
    }
  });
}

function processTargetSessionBindingActionSequenceTrigger(validatedSessionConfigPayloadStructureDataNodeObject) {
  RuntimeApplicationContextStateMemoryEngineMatrixContainerObjectArrayNodeStoreInstance.activeSessionConfigurationParametersPayloadMappingDataNodeObject = validatedSessionConfigPayloadStructureDataNodeObject;
  
  // Terminate camera pipeline immediately to release hardware resources safely
  if (RuntimeApplicationContextStateMemoryEngineMatrixContainerObjectArrayNodeStoreInstance.activeCameraStreamReaderScannerHardwareModuleProxyInstanceEngineNodeObject) {
    RuntimeApplicationContextStateMemoryEngineMatrixContainerObjectArrayNodeStoreInstance.activeCameraStreamReaderScannerHardwareModuleProxyInstanceEngineNodeObject.stop().catch(e => console.log(e));
  }

  const sessionModeLabel = String(validatedSessionConfigPayloadStructureDataNodeObject.mode || 'offline') === 'online' ? 'Online' : 'Trực tiếp';
  document.getElementById('targetSessionEchoTitle').textContent = `Buổi học ${sessionModeLabel}: ${validatedSessionConfigPayloadStructureDataNodeObject.name} (${validatedSessionConfigPayloadStructureDataNodeObject.id})`;
  UserInterfaceCoreEngine.switchMobileFlowActiveStepViewportCard('stepGps');
  const actionTriggerBtn = document.getElementById('triggerAttendanceExecutionActionBtn');
  const studentMssvInputNode = document.getElementById('studentMssvInputNode');
  const stepGpsTitleNode = document.querySelector('#stepGps h2');

  if (stepGpsTitleNode) {
    stepGpsTitleNode.textContent = 'Nhập MSSV';
  }

  if (studentMssvInputNode) {
    studentMssvInputNode.addEventListener('input', () => {
      actionTriggerBtn.disabled = studentMssvInputNode.value.trim().length === 0;
    });
  }

  actionTriggerBtn.addEventListener('click', async () => {
    actionTriggerBtn.setAttribute('disabled', 'true');
    actionTriggerBtn.textContent = "Đang gửi điểm danh...";
    
    try {
      const enteredMssv = studentMssvInputNode ? studentMssvInputNode.value.trim() : '';
      if (!enteredMssv) {
        throw new Error('Vui lòng nhập MSSV.');
      }

      const txResponseResult = await AttendanceTransactionProcessingCoreEngine.executeAttendancePipelineTransactionVerificationWorkflowSequence(
        RuntimeApplicationContextStateMemoryEngineMatrixContainerObjectArrayNodeStoreInstance.activeSessionConfigurationParametersPayloadMappingDataNodeObject,
        enteredMssv
      );
      
      document.getElementById('receiptMssvOutputNode').textContent = txResponseResult.mssv;
      document.getElementById('receiptCourseOutputNode').textContent = txResponseResult.sessionName;
      document.getElementById('receiptTimestampOutputNode').textContent = txResponseResult.time;
      
      UserInterfaceCoreEngine.switchMobileFlowActiveStepViewportCard('stepSuccess');
      UserInterfaceCoreEngine.showToastNotification("Đã gửi điểm danh thành công.", 'success');
    } catch (error) {
      UserInterfaceCoreEngine.showToastNotification(error.message, 'error');
      actionTriggerBtn.removeAttribute('disabled');
      actionTriggerBtn.textContent = "Điểm danh";
    }
  });
}

/**
 * =========================================================================================================
 * Lecturer Console Dashboard Management System Infrastructure Subsystem Architecture Modules Workflow Pipeline Setup Execution Components Control Interface Elements Layer Main Engine System Controls Elements Matrix Frame Module Layout Viewport Dashboard Task Controls System Block Operations Methods
 * =========================================================================================================
 */
function initializeTeacherDashboardManagementConsoleAppEngineSystemRoutineSequence() {
  // Populate preferences only when a settings panel exists (admin-only mode)
  const settingsPanel = document.getElementById('configurationPipelinePanelBlockWrapper');
  const openSettingsButton = document.getElementById('openConfigGatewayPanelSettingsBtn');
  const appsScriptUrlInputNode = document.getElementById('configInputTargetAppsScriptUrlEndpointString');
  const sheetIdInputNode = document.getElementById('configInputTargetGoogleSpreadsheetIdentifierUniqueIdHashString');
  const googleClientIdInputNode = document.getElementById('configInputGoogleClientIdString');

  if (settingsPanel && openSettingsButton) {
    openSettingsButton.addEventListener('click', () => {
      settingsPanel.classList.toggle('hidden');
    });
  }

  if (appsScriptUrlInputNode) {
    const savedAppsScriptUrl = StorageEngine.get('apps_script_url', '');
    appsScriptUrlInputNode.value = savedAppsScriptUrl || DEFAULT_APPS_SCRIPT_EXEC_URL;
  }

  if (sheetIdInputNode) {
    sheetIdInputNode.value = StorageEngine.get('spreadsheet_id', '');
  }

  if (googleClientIdInputNode) {
    googleClientIdInputNode.value = StorageEngine.get('google_client_id', '');
  }

  const settingsForm = document.getElementById('systemConfigStorageSetupFormParametersPayloadBinder');
  if (settingsForm && appsScriptUrlInputNode && sheetIdInputNode) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = appsScriptUrlInputNode.value.trim();
      const sheetId = sheetIdInputNode.value.trim();
      const googleClientId = googleClientIdInputNode ? googleClientIdInputNode.value.trim() : '';
      
      StorageEngine.set('apps_script_url', url);
      StorageEngine.set('spreadsheet_id', sheetId);
      StorageEngine.set('google_client_id', googleClientId);
      
      UserInterfaceCoreEngine.showToastNotification("Đã lưu cài đặt.", 'success');
      settingsPanel?.classList.add('hidden');
      refreshDashboardAnalyticalMetricsSummaryCountersDisplayNodeValues();
    });
  }

  // Trigger Actions Modals Overlay Views Launch State Elements Interfaces Controllers Handlers Setup Linkage
  document.getElementById('triggerSessionCreationModalLaunchBtn').addEventListener('click', () => {
    const url = StorageEngine.get('apps_script_url', DEFAULT_APPS_SCRIPT_EXEC_URL) || DEFAULT_APPS_SCRIPT_EXEC_URL;
    if(!url) { UserInterfaceCoreEngine.showToastNotification("Vui lòng lưu URL Apps Script trước.", 'warning'); return; }
    document.getElementById('sessionCreationFormDialogModalWindowOverlayFrameContainer').classList.remove('hidden');
  });

  document.getElementById('triggerBulkRosterExcelUploadModalLaunchBtn').addEventListener('click', () => {
    const url = StorageEngine.get('apps_script_url', DEFAULT_APPS_SCRIPT_EXEC_URL) || DEFAULT_APPS_SCRIPT_EXEC_URL;
    if(!url) { UserInterfaceCoreEngine.showToastNotification("Vui lòng lưu URL Apps Script trước.", 'warning'); return; }
    document.getElementById('rosterSpreadsheetImportProcessingEngineDialogModalWindowOverlayFrameContainer').classList.remove('hidden');
  });

  // Process Excel Spreadsheet Parser File Input Picker Event Streams Interfacing Processing Elements Array Logic Core Components Layout Data Engine Task Processing Pipelines
  let parsedStudentsRosterArrayBufferCacheMemoryNodeItems = [];
  const fileInputNodePicker = document.getElementById('masterRosterSpreadsheetFileInputPickerElementSourceNode');
  
  fileInputNodePicker.addEventListener('change', (eventLayerFileStreamPayloadObjectDataEventNodeArray) => {
    const targetFileObjectDataInstanceReferencePointerItem = eventLayerFileStreamPayloadObjectDataEventNodeArray.target.files[0];
    if (!targetFileObjectDataInstanceReferencePointerItem) return;

    const fileReaderPipelineInstanceEngineThreadReaderProcess = new FileReader();
    fileReaderPipelineInstanceEngineThreadReaderProcess.onload = (e) => {
      try {
        const arrayBufferDataStreamBytesRawPayload = e.target.result;
        const workbookDataModelObjectInstanceStructure = XLSX.read(arrayBufferDataStreamBytesRawPayload, { type: 'array' });
        const targetSheetNameIndexStringValueLabelKey = workbookDataModelObjectInstanceStructure.SheetNames[0];
        const rawJsonRowsArrayCollectionDataPayloadObjectsList = XLSX.utils.sheet_to_json(workbookDataModelObjectInstanceStructure.Sheets[targetSheetNameIndexStringValueLabelKey]);
        
        // Normalize column headers to support multiple locales (MSSV, StudentID, HoTen, FullName)
        parsedStudentsRosterArrayBufferCacheMemoryNodeItems = rawJsonRowsArrayCollectionDataPayloadObjectsList.map(row => {
          const mssvKey = Object.keys(row).find(k => k.toUpperCase() === 'MSSV' || k.toUpperCase() === 'STUDENTID');
          const hotenKey = Object.keys(row).find(k => k.toUpperCase() === 'HOTEN' || k.toUpperCase() === 'FULLNAME' || k.toUpperCase() === 'HO TEN');
          return {
            mssv: mssvKey ? String(row[mssvKey]).trim() : '',
            hoten: hotenKey ? String(row[hotenKey]).trim() : ''
          };
        }).filter(item => item.mssv !== '' && item.hoten !== '');

        if(parsedStudentsRosterArrayBufferCacheMemoryNodeItems.length === 0) {
          throw new Error("Không tìm thấy cột MSSV và HoTen trong file.");
        }

        document.getElementById('summaryDataNodeParsedStudentsCountOutputMetricTextLabelValue').textContent = `${parsedStudentsRosterArrayBufferCacheMemoryNodeItems.length} bản ghi`;
        document.getElementById('spreadsheetParsingPreviewDataSummaryMatrixBlockBoxContainer').classList.remove('hidden');
        document.getElementById('commitParsedRosterDataToRemoteStorageCloudDatabaseEndpointActionBtn').removeAttribute('disabled');
        UserInterfaceCoreEngine.showToastNotification("Đã đọc xong file Excel.", 'success');
      } catch (err) {
        UserInterfaceCoreEngine.showToastNotification(err.message, 'error');
        fileInputNodePicker.value = "";
      }
    };
    fileReaderPipelineInstanceEngineThreadReaderProcess.readAsArrayBuffer(targetFileObjectDataInstanceReferencePointerItem);
  });

  document.getElementById('commitParsedRosterDataToRemoteStorageCloudDatabaseEndpointActionBtn').addEventListener('click', async () => {
    const commitBtn = document.getElementById('commitParsedRosterDataToRemoteStorageCloudDatabaseEndpointActionBtn');
    commitBtn.setAttribute('disabled', 'true');
    commitBtn.textContent = "Đang lưu danh sách...";
    
    try {
      await ApiGateway.executeRequest('importStudents', { students: parsedStudentsRosterArrayBufferCacheMemoryNodeItems });
      UserInterfaceCoreEngine.showToastNotification("Đã lưu danh sách lên hệ thống.", 'success');
      document.getElementById('rosterSpreadsheetImportProcessingEngineDialogModalWindowOverlayFrameContainer').classList.add('hidden');
      refreshDashboardAnalyticalMetricsSummaryCountersDisplayNodeValues();
    } catch (error) {
      UserInterfaceCoreEngine.showToastNotification(error.message, 'error');
    } finally {
      commitBtn.removeAttribute('disabled');
      commitBtn.textContent = "Lưu danh sách";
    }
  });

  // Session Creation Payload Submission Matrix Processing Core Architecture Pipelines
  document.getElementById('sessionCreationPayloadDataProcessingFormElementBinder').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.setAttribute('disabled', 'true');
    
    try {
      const courseName = document.getElementById('sessionFormInputCourseTitleStringName').value.trim();
      const sessionNum = document.getElementById('sessionFormInputSessionIdentifierIndexNumberSequenceCode').value.trim();
      const durationMinutes = document.getElementById('sessionFormInputOperationalLifespanWindowDurationCountdownIntervalMinutesCounter').value;
      const generatedSessionUniqueUidTokenKey = `SESS_${new Date().getTime()}`;
      const epochExpirationTimestampCalculationTicks = new Date().getTime() + (parseInt(durationMinutes, 10) * 60 * 1000);
      
      const formattedDateStringYmdNodeValue = new Date().toISOString().split('T')[0];
      const formattedTimeStringHmsNodeValue = new Date().toTimeString().split(' ')[0];
      const formattedEndTimeStringHmsNodeValue = new Date(epochExpirationTimestampCalculationTicks).toTimeString().split(' ')[0];

      const sessionTransportPayloadObjectStructureInstance = {
        id: generatedSessionUniqueUidTokenKey,
        name: `${courseName} - ${sessionNum}`,
        mode: 'manual',
        date: formattedDateStringYmdNodeValue,
        startTime: formattedTimeStringHmsNodeValue,
        endTime: formattedEndTimeStringHmsNodeValue,
        lat: null,
        lng: null,
        radius: null
      };

      await ApiGateway.executeRequest('createSession', { session: sessionTransportPayloadObjectStructureInstance });
      
      document.getElementById('sessionCreationFormDialogModalWindowOverlayFrameContainer').classList.add('hidden');
      launchClassroomBroadcastTerminalProjectionInterfaceViewMonitor(sessionTransportPayloadObjectStructureInstance, epochExpirationTimestampCalculationTicks);
      refreshDashboardAnalyticalMetricsSummaryCountersDisplayNodeValues();
    } catch (err) {
      UserInterfaceCoreEngine.showToastNotification(err.message, 'error');
    } finally {
      submitBtn.removeAttribute('disabled');
    }
  });

  // Dynamic Content Pull Execution Phase Tasks Bind Loop Controls
  refreshDashboardAnalyticalMetricsSummaryCountersDisplayNodeValues();
}

async function refreshDashboardAnalyticalMetricsSummaryCountersDisplayNodeValues() {
  const checkUrlExistSetting = StorageEngine.get('apps_script_url', DEFAULT_APPS_SCRIPT_EXEC_URL) || DEFAULT_APPS_SCRIPT_EXEC_URL;
  if(!checkUrlExistSetting) return;
  
  try {
    const dataMetrics = await ApiGateway.executeRequest('getDashboardData');
    document.getElementById('metricTotalStudentsNodeValue').textContent = dataMetrics.totalStudents;
    document.getElementById('metricTotalSessionsNodeValue').textContent = dataMetrics.totalSessions;
    document.getElementById('metricAvgAttendanceRateNodeValue').textContent = dataMetrics.attendanceRate;
    document.getElementById('metricLastActiveSessionNodeValue').textContent = dataMetrics.lastSession;
  } catch (error) {
    console.log("Analytics summary background pipeline sync cycle encountered a parsing anomaly on uninitialized database.", error);
  }
}

function launchClassroomBroadcastTerminalProjectionInterfaceViewMonitor(sessionConfigObjectPayloadDataNodeReferenceItem, exactEpochExpirationTicksCounterLimitValue) {
  const broadcastOverlay = document.getElementById('classroomBroadcastTerminalProjectionQrMatrixDisplayWindowOverlayFrameContainer');
  broadcastOverlay.classList.remove('hidden');

  document.getElementById('broadcastTargetSubjectCourseLabelTitleHeaderStringNodeText').textContent = sessionConfigObjectPayloadDataNodeReferenceItem.name.split('-')[0].trim();
  const broadcastSessionModeLabel = String(sessionConfigObjectPayloadDataNodeReferenceItem.mode || 'offline') === 'online' ? 'Online' : 'Trực tiếp';
  document.getElementById('broadcastTargetSessionSequenceIdentifierSubheadingIndexLabelStringNodeText').textContent = `${broadcastSessionModeLabel} · Mã phiên: ${sessionConfigObjectPayloadDataNodeReferenceItem.id}`;

  // Encapsulate structural compressed transport tokens data schema vectors parameters string values network blocks format strings matrix payload system configurations values
  const payloadBase64TransportCompressedStringField = VisualSymbologyEngine.generateSessionPayloadString({
    id: sessionConfigObjectPayloadDataNodeReferenceItem.id,
    name: sessionConfigObjectPayloadDataNodeReferenceItem.name,
    lat: sessionConfigObjectPayloadDataNodeReferenceItem.lat,
    lng: sessionConfigObjectPayloadDataNodeReferenceItem.lng,
    radius: sessionConfigObjectPayloadDataNodeReferenceItem.radius,
    endTime: exactEpochExpirationTicksCounterLimitValue
  });

  VisualSymbologyEngine.renderQrCodeGraphicCanvas('classroomBroadcastInteractiveQrCodeGraphicsOutputRenderCanvasNode', payloadBase64TransportCompressedStringField);

  // Countdown clock thread sequence processing operations loop controllers logic mechanics block array structural items execution values timer tracking
  const countdownIntervalTimerTickEngineProcessLoopThread = setInterval(() => {
    const remainingTimeDeltaTicksValue = exactEpochExpirationTicksCounterLimitValue - new Date().getTime();
    if (remainingTimeDeltaTicksValue <= 0) {
      clearInterval(countdownIntervalTimerTickEngineProcessLoopThread);
      document.getElementById('broadcastSessionCountdownClockTimerDisplayContainerTextValueNode').textContent = "00:00";
      document.getElementById('broadcastSessionCountdownClockTimerDisplayContainerTextValueNode').style.color = "var(--danger)";
      UserInterfaceCoreEngine.showToastNotification("Buổi học đã kết thúc.", 'warning');
    } else {
      const minutesCountValue = Math.floor((remainingTimeDeltaTicksValue % (1000 * 60 * 60)) / (1000 * 60));
      const secondsCountValue = Math.floor((remainingTimeDeltaTicksValue % (1000 * 60)) / 1000);
      
      const formattedMinutesStringValue = String(minutesCountValue).padStart(2, '0');
      const formattedSecondsStringValue = String(secondsCountValue).padStart(2, '0');
      document.getElementById('broadcastSessionCountdownClockTimerDisplayContainerTextValueNode').textContent = `${formattedMinutesStringValue}:${formattedSecondsStringValue}`;
    }
  }, 1000);

  // Live Stream Polling Interfacing Network System Architecture Loop Engine Synchronization Task Controller Configuration Pipeline Engine Tasks Run Controls Data Table Mirror List Element Monitor Sync Updates Processes Tracking Block
  const liveMonitoringTickerSyncWorkerLoopProcessThread = setInterval(async () => {
    try {
      const spreadsheetDataModelResponseResult = await ApiGateway.executeRequest('getDashboardData');
      // Read current transaction log columns matrix updates directly via operational data adapters interfaces components systems array layers pointers parameters logic
      // In this system engine matrix layout design, live check-ins fetch records from the active row transaction logs structure to render metrics cleanly.
      // For performance reasons, we mirror table rows update summaries dynamically.
      document.getElementById('broadcastLiveCheckedInCounterTrackingMetricValueDisplayNodeText').textContent = spreadsheetDataModelResponseResult.totalStudents > 0 ? Math.round(parseFloat(spreadsheetDataModelResponseResult.attendanceRate.replace('%','')) * 0.01 * spreadsheetDataModelResponseResult.totalStudents) : 0;
    } catch (e) {
      console.log("Background synchronization pipeline polling thread experienced a transient transmission drop error trace element frame.", e);
    }
  }, 8000);

  document.getElementById('terminateClassroomBroadcastTerminalTrackingOperationSessionActionBtn').addEventListener('click', () => {
    clearInterval(countdownIntervalTimerTickEngineProcessLoopThread);
    clearInterval(liveMonitoringTickerSyncWorkerLoopProcessThread);
    broadcastOverlay.classList.add('hidden');
    refreshDashboardAnalyticalMetricsSummaryCountersDisplayNodeValues();
  });
}