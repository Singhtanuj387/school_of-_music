# Strict Platform Rule: Zero Dummy Data Policy

Under NO circumstances should any mock, fallback, placeholder, simulated, or dummy data be displayed or hardcoded in any user-facing dashboards, charts, tables, cards, or KPIs.

## Rules:
1. **100% Real Database Truth**: All values (counts, revenues, progress percentages, chart bars, schedule items, conversion funnels, audit logs) must strictly reflect actual database records (`db.user`, `db.lesson`, `db.trialRequest`, `db.payment`, `db.enrollment`, etc.).
2. **Handle Zero Gracefully**: If the database count or amount is zero (e.g. ₹0 revenue, 0 lessons scheduled, 0 active sessions), display `0`, `₹0`, or an authentic clean empty state. Never inject artificial minimum heights, fake names (e.g., "Ananya Rao", "Dev Malhotra"), or default baseline numbers (e.g., 842, 64, 1126, 86%).
3. **Collections & Analytics Charts**: If there are no payments for a day or week, the chart bars must reflect 0 (a flat baseline indicator), not fake pre-filled heights.
