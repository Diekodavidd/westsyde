import { games } from "../data/games";

export const REGISTRATION_STORAGE_KEY = "westsyde_regs_v1";

export const DEFAULT_SEATS = 10;
export const DEFAULT_CAPACITY = 12;
export const DEFAULT_GROUPS = 1;
export const DEFAULT_RESERVES = 2;
export const DEFAULT_MAX_GAMES_PER_PERSON = 2;

export function getGameConfig(gameId) {
  const game = games.find((item) => item.id === gameId);

  if (!game) {
    return {
      groups: DEFAULT_GROUPS,
      seatsPerGroup: DEFAULT_SEATS,
      reserves: DEFAULT_RESERVES,
      capacity: DEFAULT_CAPACITY,
    };
  }

  const groups = game.groups || DEFAULT_GROUPS;

  const seatsPerGroup =
    game.seatsPerGroup || DEFAULT_SEATS;

  const reserves =
    typeof game.reserves === "number"
      ? game.reserves
      : DEFAULT_RESERVES;

  return {
    groups,
    seatsPerGroup,
    reserves,
    capacity: groups * seatsPerGroup + reserves,
  };
}

export function getGameRegistrations(
  registrations,
  gameId
) {
  return (registrations && registrations[gameId]) || [];
}

export function getRegularRegistrations(
  registrations,
  gameId
) {
  return getGameRegistrations(
    registrations,
    gameId
  ).filter((entry) => !entry.reserve);
}

export function getFilledSeats(
  registrations,
  gameId
) {
  return getRegularRegistrations(
    registrations,
    gameId
  ).length;
}

export function getReserveCount(
  registrations,
  gameId
) {
  return getGameRegistrations(
    registrations,
    gameId
  ).filter((entry) => entry.reserve).length;
}

export function getOpenSeats(
  registrations,
  gameId
) {
  const config = getGameConfig(gameId);

  return (
    config.groups * config.seatsPerGroup -
    getFilledSeats(registrations, gameId)
  );
}

export function getGameCapacity(
  gameId
) {
  return getGameConfig(gameId).capacity;
}

export function getGroupCount(gameId) {
  return getGameConfig(gameId).groups;
}

export function getSeatsPerGroup(gameId) {
  return getGameConfig(gameId).seatsPerGroup;
}

export function getReserveCapacity(gameId) {
  return getGameConfig(gameId).reserves;
}

export function isGameFull(
  registrations,
  gameId
) {
  const capacity = getGameCapacity(gameId);

  return (
    getGameRegistrations(
      registrations,
      gameId
    ).length >= capacity
  );
}

export function getGroupRegistrations(
  registrations,
  gameId,
  group
) {
  return getRegularRegistrations(
    registrations,
    gameId
  ).filter(
    (entry) => (entry.group || 1) === group
  );
}

export function getGroupFilledSeats(
  registrations,
  gameId,
  group
) {
  return getGroupRegistrations(
    registrations,
    gameId,
    group
  ).length;
}

export function getGroupOpenSeats(
  registrations,
  gameId,
  group
) {
  const config = getGameConfig(gameId);

  return Math.max(
    0,
    config.seatsPerGroup -
      getGroupFilledSeats(
        registrations,
        gameId,
        group
      )
  );
}

export function getGameStatus(
  registrations,
  gameId
) {
  const config = getGameConfig(gameId);

  const list = getGameRegistrations(
    registrations,
    gameId
  );

  const filled = getFilledSeats(
    registrations,
    gameId
  );

  const reserves = getReserveCount(
    registrations,
    gameId
  );

  const totalCapacity = config.capacity;

  const playerCapacity =
    config.groups * config.seatsPerGroup;

  const left = playerCapacity - filled;

  const full = list.length >= totalCapacity;

  return {
    groups: config.groups,
    seatsPerGroup: config.seatsPerGroup,
    reserveCapacity: config.reserves,

    filled,
    reserves,
    left,

    totalCapacity,
    playerCapacity,

    isFull: full,
    isOpen: !full,

    statusText:
      left > 0
        ? `${left} seats left`
        : reserves < config.reserves
          ? "Reserves only"
          : "Full",

    filledText:
      config.groups > 1
        ? `${filled} / ${playerCapacity} seats`
        : `${filled} / ${config.seatsPerGroup} seats`,

    reserveText:
      reserves > 0
        ? `${reserves} / ${config.reserves} reserves`
        : `${config.reserves} reserves open`,

    pct: `${Math.round(
      (list.length / totalCapacity) * 100
    )}%`,

    cta: full
      ? "Panel locked"
      : left > 0
        ? "Register"
        : "Join reserves",
  };
}

export function sortRegistrations(
  registrations = []
) {
  return [...registrations].sort((a, b) => {
    if (a.reserve !== b.reserve) {
      return a.reserve ? 1 : -1;
    }

    if (
      !a.reserve &&
      !b.reserve &&
      (a.group || 1) !== (b.group || 1)
    ) {
      return (
        (a.group || 1) -
        (b.group || 1)
      );
    }

    return a.seat - b.seat;
  });
}

export function getSeatLabel(entry) {
  if (entry.reserve) {
    return `R${entry.seat}`;
  }

  return `S${entry.seat}`;
}

export function getFullSeatLabel(entry) {
  if (entry.reserve) {
    return `Reserve ${entry.seat}`;
  }

  if (entry.group) {
    return `Group ${entry.group} · Seat ${entry.seat}`;
  }

  return `Seat ${entry.seat}`;
}

export function getPlayerGameCount(
  registrations,
  name
) {
  const key = name.trim().toLowerCase();

  return Object.keys(registrations || {}).filter(
    (gameId) =>
      getGameRegistrations(
        registrations,
        gameId
      ).some(
        (entry) =>
          entry.name.toLowerCase() === key
      )
  ).length;
}

export function playerAlreadyRegistered(
  registrations,
  gameId,
  name
) {
  const key = name.trim().toLowerCase();

  return getGameRegistrations(
    registrations,
    gameId
  ).some(
    (entry) =>
      entry.name.toLowerCase() === key
  );
}

export function getRandomAvailableSeat(
  list = [],
  group = 1,
  seatsPerGroup = DEFAULT_SEATS
) {
  const taken = list
    .filter(
      (entry) =>
        !entry.reserve &&
        (entry.group || 1) === group
    )
    .map((entry) => entry.seat);

  const free = [];

  for (
    let seat = 1;
    seat <= seatsPerGroup;
    seat += 1
  ) {
    if (!taken.includes(seat)) {
      free.push(seat);
    }
  }

  if (!free.length) {
    return null;
  }

  return free[
    Math.floor(Math.random() * free.length)
  ];
}

export function getNextReserveNumber(
  list = []
) {
  return (
    list.filter(
      (entry) => entry.reserve
    ).length + 1
  );
}

export function createRegistrationEntry({
  name,
  gender,
  list = [],
  gameId,
}) {
  const config = getGameConfig(gameId);

  let group = null;
  let seat = null;
  let reserve = false;

  /*
   * Find the first group with an open seat.
   */
  for (
    let currentGroup = 1;
    currentGroup <= config.groups;
    currentGroup += 1
  ) {
    const groupPlayers = list.filter(
      (entry) =>
        !entry.reserve &&
        (entry.group || 1) ===
          currentGroup
    );

    if (
      groupPlayers.length <
      config.seatsPerGroup
    ) {
      const availableSeat =
        getRandomAvailableSeat(
          list,
          currentGroup,
          config.seatsPerGroup
        );

      if (availableSeat !== null) {
        group = currentGroup;
        seat = availableSeat;
        break;
      }
    }
  }

  /*
   * All groups are full → reserve.
   */
  if (group === null) {
    reserve = true;
    seat = getNextReserveNumber(list);
  }

  return {
    name: name.trim(),
    gender,
    group,
    seat,
    reserve,
    ts: Date.now(),
  };
}

export function calculateTotalFilled(
  registrations,
  gamesList
) {
  return gamesList.reduce(
    (total, game) =>
      total +
      getFilledSeats(
        registrations,
        game.id
      ),
    0
  );
}

export function calculateTotalCapacity(
  gamesList
) {
  return gamesList.reduce(
    (total, game) => {
      const config = getGameConfig(game.id);

      return (
        total +
        config.groups *
          config.seatsPerGroup
      );
    },
    0
  );
}

export function calculateTotalRegistrationCapacity(
  gamesList
) {
  return gamesList.reduce(
    (total, game) =>
      total +
      getGameConfig(game.id).capacity,
    0
  );
}