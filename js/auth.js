/**
 * Google Identity Service Ecosystem Interfacing Core Authentication Architecture Logic Layer Pipeline Setup Component
 */

import { StorageEngine } from './storage.js';

export const FederatedIdentityEngine = {
  getConfiguredGoogleClientId() {
    return StorageEngine.get('google_client_id', '').trim();
  },

  decodeJwtPayloadClaimsToken(credentialJwtTokenString) {
    try {
      const base64UrlString = credentialJwtTokenString.split('.')[1];
      const base64String = base64UrlString.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayloadString = decodeURIComponent(window.atob(base64String).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayloadString);
    } catch (e) {
      throw new Error("Mã xác thực không hợp lệ.");
    }
  },

  initializeGoogleIdentityButton(containerElementId, authenticationCallbackSuccessHandler) {
    // Dynamic initialization of structural system credentials elements anchors parameters layer tracking module vectors
    const containerElement = document.getElementById(containerElementId);
    if (!containerElement) return;

    containerElement.innerHTML = '';

    const configuredClientId = this.getConfiguredGoogleClientId();
    if (!configuredClientId) {
      containerElement.innerHTML = '<div class="text-muted">Chưa có Google Client ID. Hãy nhập trong phần cài đặt của giảng viên.</div>';
      return;
    }

    if (typeof google === 'undefined' || !google.accounts) {
      console.error("Không tải được thư viện đăng nhập Google.");
      containerElement.innerHTML = '<div class="text-muted">Không tải được nút đăng nhập Google. Hãy kiểm tra kết nối mạng hoặc tải lại trang.</div>';
      return;
    }

    google.accounts.id.initialize({
      client_id: configuredClientId,
      callback: (authResponsePacket) => {
        try {
          const claimsPayload = this.decodeJwtPayloadClaimsToken(authResponsePacket.credential);
          StorageEngine.set('identity_profile_cached_payload', claimsPayload);
          authenticationCallbackSuccessHandler(claimsPayload);
        } catch (error) {
          console.error("Không thể giải mã thông tin đăng nhập.", error);
        }
      }
    });

    try {
      google.accounts.id.renderButton(
        containerElement,
        { theme: "outline", size: "large", width: 320, text: "signin_with" }
      );
    } catch (error) {
      console.error("Không thể hiển thị nút đăng nhập Google.", error);
      containerElement.innerHTML = '<div class="text-muted">Không hiển thị được nút đăng nhập Google.</div>';
    }
  }
};