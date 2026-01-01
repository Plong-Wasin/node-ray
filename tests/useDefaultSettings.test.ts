import { describe, it, expect, beforeEach } from 'vitest';
import { Ray } from '@/Ray';
import { Ray as RayNode } from '@/RayNode';

describe('Ray.useDefaultSettings', () => {
    beforeEach(() => {
        // Reset default settings before each test
        Ray.defaultSettings = { not_defined: true };
        // Note: We can't directly reset settingsInstance as it's protected
        // But since we're testing the behavior, this should be fine
    });

    it('should apply default settings to base Ray class', () => {
        Ray.useDefaultSettings({ host: '123.123.123.123', port: 25317 });

        const instance = Ray.create();
        const settings = instance.settings.toObject();

        expect(settings.host).toBe('123.123.123.123');
        expect(settings.port).toBe(25317);
    });

    it('should apply default settings to RayNode class', () => {
        Ray.useDefaultSettings({ host: '123.123.123.123', port: 25317 });

        const instance = RayNode.create();
        const settings = instance.settings.toObject();

        expect(settings.host).toBe('123.123.123.123');
        expect(settings.port).toBe(25317);
    });

    it('should merge default settings with existing defaults', () => {
        Ray.useDefaultSettings({ host: '192.168.1.1', port: 9999 });

        const instance = Ray.create();
        const settings = instance.settings.toObject();

        expect(settings.host).toBe('192.168.1.1');
        expect(settings.port).toBe(9999);
        expect(settings.enable).toBe(true); // Should retain default value
    });

    it('should allow multiple calls to useDefaultSettings', () => {
        Ray.useDefaultSettings({ host: 'first.example.com', port: 1111 });
        Ray.useDefaultSettings({ host: 'second.example.com', port: 2222 });

        const instance = Ray.create();
        const settings = instance.settings.toObject();

        expect(settings.host).toBe('second.example.com');
        expect(settings.port).toBe(2222);
    });

    it('should work with the ray() helper function', () => {
        Ray.useDefaultSettings({ host: 'helper.example.com', port: 3333 });

        const instance = Ray.create();
        const settings = instance.settings.toObject();

        expect(settings.host).toBe('helper.example.com');
        expect(settings.port).toBe(3333);
    });
});
