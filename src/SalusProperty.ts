export interface SalusProperty {
    type: string;
    name: string;
    base_type: 'integer' | 'boolean' | 'string';
    read_only: boolean;
    direction: 'output' | 'input';
    scope: string;
    data_updated_at: string;
    key: number;
    device_key: number;
    product_name: string;
    track_only_changes: boolean;
    display_name: string;
    host_sw_version: boolean;
    time_series: boolean;
    derived: boolean;
    app_type: null;
    recipe: null;
    value: any;
    generated_from: string | null;
    enerated_at: number | null;
    denied_roles: [];
    ack_enabled: false;
    retention_days: number;
}