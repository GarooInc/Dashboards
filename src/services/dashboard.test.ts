import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as dashboard from './dashboard';

function mockResponse(body: any, ok = true) {
  return {
    ok,
    status: ok ? 200 : 500,
    statusText: ok ? 'OK' : 'Error',
    headers: { get: (_: string) => 'application/json' },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

beforeEach(() => {
  // Mock global.fetch para los tests
  // @ts-ignore
  global.fetch = vi.fn().mockResolvedValue(mockResponse({ result: 'ok' }));
});

describe('dashboard service - GET endpoints', () => {
  it('getAppointments llama al endpoint correcto y devuelve JSON', async () => {
    const res = await dashboard.getAppointments();

    // Verificamos que fetch fue llamado con la ruta esperada
    // @ts-ignore
    expect(global.fetch).toHaveBeenCalledWith('/appointments/', expect.objectContaining({ method: 'GET' }));

    // y que la respuesta sea la que mockeamos
    expect(res).toEqual({ result: 'ok' });
  });

  it('countAppointments llama a /appointments/count_appointments', async () => {
    await dashboard.countAppointments();
    // @ts-ignore
    expect(global.fetch).toHaveBeenCalledWith('/appointments/count_appointments', expect.any(Object));
  });

  it('getUsers llama a /users/', async () => {
    await dashboard.getUsers();
    // @ts-ignore
    expect(global.fetch).toHaveBeenCalledWith('/users/', expect.any(Object));
  });
});
