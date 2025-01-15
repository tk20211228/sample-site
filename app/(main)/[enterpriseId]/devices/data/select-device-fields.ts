export const selectDevicesTableFields = `
        deviceId:device_id,
        enterpriseId:enterprise_id,
        policyId:policy_id,
        deviceIdentifier:device_identifier,
        deviceDisplayName:device_display_name,
        device_data->>state,
        device_data->>appliedState,
        device_data->>lastSyncTime,
        device_data->>policyCompliant,
        device_data->>enrollmentTime,
        device_data->>lastStatusReportTime,
        createdAt:created_at,
        updatedAt:updated_at,
        ...policies (
            policyDisplayName:policy_display_name
            )
    `;
/**
 * 
)
isMobile
const devices: {
    id: string;
    device_name: string;
    display_name: string;
    policy_name: string | null;
    state: string;
    lastSyncTime: string;
    policyCompliant: string;
    enrollmentTime: string;
    lastStatusReportTime: string;
    created_at: string;
    updated_at: string;
}[] | null
 */
