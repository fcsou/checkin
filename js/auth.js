/**
 * Google Identity Service Ecosystem Interfacing Core Authentication Architecture Logic Layer Pipeline Setup Component
 */

import { StorageEngine } from './storage.js';

export const FederatedIdentityEngine = {
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
    if (typeof google === 'undefined' || !google.accounts) {
      console.error("Không tải được thư viện đăng nhập Google.");
      return;
    }

    google.accounts.id.initialize({
      client_id: "973151838491-v78amfbrgkvpdmv7oqtkl0v6143cfaon.apps.googleusercontent.com", // Multi-tenant dynamic binding engine client identifier token key profile system parameters framework mapping setup logic
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

    google.accounts.id.renderButton(
      document.getElementById(containerElementId),
      { theme: "outline", size: "large", width: "100%", text: "signin_with" }
    );
  }
};