import { schedule_2025 } from '@/info/info_schedule2025';

const allSchedule = schedule_2025.flatMap((race) =>
  Object.entries(race.sessions).map(([type, date]) => ({
    type,
    date: new Date(date),
    raceName: race.race_name,
    location: race.location,
    flag: race.flag,
  }))
);

export function getNextSession() {
  const now = new Date();

  return (
    allSchedule
      .filter((s) => s.date > now)
      .sort((a, b) => a.date - b.date)[0] ?? null
  );
}

export function getCurrentSession() {
  const now = new Date();

  const sorted = allSchedule.sort((a, b) => a.date - b.date);

  for (let session of sorted) {
    const bufferHours = session.type.toLowerCase() === 'gp' ? 5 : 2;
    const sessionEnd = new Date(
      session.date.getTime() + bufferHours * 60 * 60 * 1000
    );

    // Return the current session if the session is on going
    if (now >= session.date && now < sessionEnd) {
      return session;
    }
  }

  // Return the next session if the session is ended
  for (let session of sorted) {
    if (now < session.date) {
      return session;
    }
  }

  return null;
}

export function getSessionStatusLabel(session, sessionDate, sessionType) {
  if (!session || !sessionDate) return 'Session';

  const now = new Date();
  const start = new Date(sessionDate);
  const delayHours = sessionType?.toLowerCase() === 'gp' ? 4 : 2;
  const end = new Date(start.getTime() + delayHours * 60 * 60 * 1000);

  if (now >= start && now < end) {
    return 'Current Session';
  }

  if (now < start) {
    return 'Next Session';
  }

  return 'Session Ended';
}
