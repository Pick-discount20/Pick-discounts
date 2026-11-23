/**
 * Peak Discount Customer Support Configuration
 * 
 * Configurable WhatsApp customer support channel.
 * 
 * INSTRUCTIONS FOR CLIENT:
 * To activate live WhatsApp chat, set `phoneNumber` to your official business 
 * WhatsApp number in international format with country code and without '+' or spaces 
 * (e.g., '919876543210' for India).
 * 
 * When empty, the application will display the transparent onboarding dialog 
 * informing visitors that direct customer support onboarding is in progress.
 */
export const WHATSAPP_SUPPORT_CONFIG = {
  // Official business WhatsApp number provided by client (leave empty until assigned)
  phoneNumber: '', // e.g. '919876543210'
  defaultMessage: 'Hello Peak Discount Support, I would like to inquire about local business discovery and verification.',
  channelLabel: 'WhatsApp Support',
  supportEmail: 'support@peakdiscount.com',
  operatingHours: 'Monday - Saturday: 9:00 AM - 8:00 PM IST',
};

/**
 * Returns the live WhatsApp click-to-chat URL if a number is configured,
 * or null if pending configuration.
 */
export function getWhatsAppSupportUrl(): string | null {
  const number = WHATSAPP_SUPPORT_CONFIG.phoneNumber.trim();
  if (!number) {
    return null;
  }
  const cleanNumber = number.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(WHATSAPP_SUPPORT_CONFIG.defaultMessage);
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
}
