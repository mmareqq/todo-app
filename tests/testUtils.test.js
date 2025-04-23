import { formatDuration } from '../src/utils/formatTime';

test('0 to be 0min', () => {
   expect(formatDuration(0)).toBe('0min');
});

test('10 to be 10min', () => {
   expect(formatDuration(10)).toBe('10min');
});

test('60 to be 1h', () => {
   expect(formatDuration(60)).toBe('1h');
});

test('90 to be 1h 30min', () => {
   expect(formatDuration(90)).toBe('1h 30min');
});

test('360 to be 6h', () => {
   expect(formatDuration(360)).toBe('6h');
});

test('only number can be passed', () => {
   expect(formatDuration('asdf')).toBe(null);
});
