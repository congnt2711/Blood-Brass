const SAVE_KEY_PREFIX = "blood-and-brass-account-save-v4";
const ACCOUNT_REGISTRY_KEY = "blood-and-brass-account-registry-v1";
const CURRENT_ACCOUNT_KEY = "blood-and-brass-current-account-v1";
const ENERGY_REGEN_MS = 60 * 1000;
const STAMINA_REGEN_BASE_MS = 10 * 60 * 1000;
const STAMINA_REGEN_LEVEL_REDUCTION_MS = 2 * 1000;
const SHOP_AUTO_REFRESH_MS = 60 * 60 * 1000;
const BOSS_RESPAWN_MS = 60 * 60 * 1000;
const INVENTORY_LIMIT = 18;

const rarityTiers = [
  { key: "common", label: "Trắng", className: "rarity-common", multiplier: 1 },
  { key: "azure", label: "Xanh lam", className: "rarity-azure", multiplier: 2 },
  { key: "blue", label: "Xanh dương", className: "rarity-blue", multiplier: 4 },
  { key: "epic", label: "Tím", className: "rarity-epic", multiplier: 8 },
  { key: "legendary", label: "Vàng", className: "rarity-legendary", multiplier: 16 },
  { key: "mythic", label: "Đỏ", className: "rarity-mythic", multiplier: 32 },
];

const dungeons = [
  { id: "dungeon-1", name: "Hẻm Gãy Xương", requiredLevel: 1, duration: 12, energyCost: 3, goldRange: [28, 44], xpRange: [16, 26], danger: 12, lootChance: 0.18 },
  { id: "dungeon-2", name: "Hầm Tế Lễ", requiredLevel: 2, duration: 18, energyCost: 5, goldRange: [46, 72], xpRange: [28, 42], danger: 18, lootChance: 0.26 },
  { id: "dungeon-3", name: "Hành Lang Tro Tàn", requiredLevel: 4, duration: 24, energyCost: 7, goldRange: [70, 108], xpRange: [44, 66], danger: 26, lootChance: 0.34 },
  { id: "dungeon-4", name: "Mê Cung Đồng Thau", requiredLevel: 6, duration: 30, energyCost: 9, goldRange: [96, 146], xpRange: [62, 88], danger: 34, lootChance: 0.42 },
  { id: "dungeon-5", name: "Tháp Khấn Máu", requiredLevel: 8, duration: 36, energyCost: 11, goldRange: [132, 192], xpRange: [86, 122], danger: 44, lootChance: 0.52 },
];

const bosses = [
  {
    id: "boss-1",
    name: "Người Gác Chuông Đẫm Tro",
    requiredLevel: 3,
    energyCost: 6,
    recommendedPower: 62,
    reward: { gold: 120, xp: 85, renown: 14, item: { slot: "Vũ khí", name: "Đao chuông nứt", stats: { strength: 5, agility: 1, vitality: 0, renown: 2 } } },
  },
  {
    id: "boss-2",
    name: "Nữ Tu Ghim Đồng",
    requiredLevel: 6,
    energyCost: 8,
    recommendedPower: 105,
    reward: { gold: 220, xp: 150, renown: 24, item: { slot: "Áo giáp", name: "Giáp nghi lễ khâu đinh", stats: { strength: 2, agility: 0, vitality: 6, renown: 2 } } },
  },
  {
    id: "boss-3",
    name: "Lãnh Chúa Đồng Hồ Chết",
    requiredLevel: 9,
    energyCost: 10,
    recommendedPower: 156,
    reward: { gold: 360, xp: 250, renown: 38, item: { slot: "Mão", name: "Vương miện kim sai", stats: { strength: 2, agility: 3, vitality: 3, renown: 4 } } },
  },
];

const titleTiers = [
  { renown: 0, title: "Kẻ vô danh" },
  { renown: 30, title: "Sát thủ khu lao" },
  { renown: 80, title: "Chiến binh chuông đồng" },
  { renown: 160, title: "Đồ tể đấu trường" },
  { renown: 280, title: "Lãnh chúa màn đêm" },
];

const itemCatalog = [
  { id: "hook-blade", minLevel: 1, slot: "Vũ khí", name: "Móc kiếm phố cũ", desc: "+3 sức mạnh, +1 nhanh nhẹn", cost: 64, stats: { strength: 3, agility: 1, vitality: 0, renown: 0 } },
  { id: "street-hide", minLevel: 1, slot: "Áo giáp", name: "Áo da đầu ngõ", desc: "+4 thể lực", cost: 58, stats: { strength: 0, agility: 0, vitality: 4, renown: 0 } },
  { id: "coal-ring", minLevel: 1, slot: "Nhẫn", name: "Nhẫn than còn nóng", desc: "+2 thể lực, +2 uy danh", cost: 74, stats: { strength: 0, agility: 0, vitality: 2, renown: 2 } },
  { id: "grave-boots", minLevel: 2, slot: "Giày", name: "Ủng địa táng", desc: "+3 nhanh nhẹn, +1 thể lực", cost: 92, stats: { strength: 0, agility: 3, vitality: 1, renown: 0 } },
  { id: "burnt-amulet", minLevel: 2, slot: "Bùa", name: "Bùa tro cháy", desc: "+2 sức mạnh, +2 nhanh nhẹn", cost: 110, stats: { strength: 2, agility: 2, vitality: 0, renown: 1 } },
  { id: "brass-gloves", minLevel: 3, slot: "Găng", name: "Găng đồng tán lực", desc: "+4 sức mạnh", cost: 126, stats: { strength: 4, agility: 0, vitality: 0, renown: 0 } },
  { id: "lantern-spear", minLevel: 4, slot: "Vũ khí", name: "Thương đèn canh xác", desc: "+5 sức mạnh, +2 uy danh", cost: 164, stats: { strength: 5, agility: 0, vitality: 0, renown: 2 } },
  { id: "cathedral-mail", minLevel: 4, slot: "Áo giáp", name: "Giáp mắt xích nhà nguyện", desc: "+5 thể lực, +1 sức mạnh", cost: 176, stats: { strength: 1, agility: 0, vitality: 5, renown: 0 } },
  { id: "whisper-cloak", minLevel: 5, slot: "Áo choàng", name: "Áo choàng tiếng thì thầm", desc: "+4 nhanh nhẹn, +2 uy danh", cost: 198, stats: { strength: 0, agility: 4, vitality: 0, renown: 2 } },
  { id: "bell-chain", minLevel: 6, slot: "Bùa", name: "Dây chuông phản hồn", desc: "+2 sức mạnh, +3 thể lực, +2 uy danh", cost: 224, stats: { strength: 2, agility: 0, vitality: 3, renown: 2 } },
  { id: "bone-crown", minLevel: 7, slot: "Mão", name: "Mão xương thủ lĩnh", desc: "+2 mọi chỉ số, +3 uy danh", cost: 258, stats: { strength: 2, agility: 2, vitality: 2, renown: 3 } },
  { id: "obsidian-edge", minLevel: 8, slot: "Vũ khí", name: "Lưỡi obsidian hiến tế", desc: "+7 sức mạnh, +2 nhanh nhẹn", cost: 302, stats: { strength: 7, agility: 2, vitality: 0, renown: 1 } },
  { id: "arena-seal", minLevel: 9, slot: "Nhẫn", name: "Ấn triện vô địch", desc: "+3 sức mạnh, +3 thể lực, +4 uy danh", cost: 340, stats: { strength: 3, agility: 0, vitality: 3, renown: 4 } },
];

const lootTable = [
  { slot: "Vũ khí", name: "Lưỡi câu nghi lễ", stats: { strength: 4, agility: 1, vitality: 0, renown: 1 } },
  { slot: "Bùa", name: "Dây chuyền tro tàn", stats: { strength: 0, agility: 2, vitality: 2, renown: 2 } },
  { slot: "Găng", name: "Găng đấu sĩ mòn", stats: { strength: 2, agility: 2, vitality: 1, renown: 1 } },
  { slot: "Áo choàng", name: "Áo choàng thợ săn sương", stats: { strength: 1, agility: 3, vitality: 0, renown: 1 } },
  { slot: "Nhẫn", name: "Nhẫn thiếc hầm sâu", stats: { strength: 1, agility: 1, vitality: 2, renown: 1 } },
];

const enemyNames = [
  "Đao phủ xích đen",
  "Kẻ đào mộ vô diện",
  "Lính canh phản đạo",
  "Sát thủ tháp chuông",
  "Tu sĩ thiêu sống",
  "Đấu sĩ mất cằm",
];

const slotIcons = {
  "Vũ khí": "⚔",
  "Áo giáp": "🛡",
  "Nhẫn": "◌",
  "Giày": "👢",
  "Bùa": "✦",
  "Găng": "🧤",
  "Áo choàng": "🜂",
  "Mão": "♛",
};

function createInitialState() {
  return {
    player: {
      level: 1,
      xp: 0,
      xpToNext: 100,
      gold: 120,
      hp: 120,
      maxHp: 120,
      energy: 20,
      maxEnergy: 20,
      stamina: 10,
      maxStamina: 10,
      strength: 8,
      agility: 7,
      vitality: 9,
      renown: 0,
    },
    gear: {
      "Vũ khí": null,
      "Áo giáp": null,
      "Nhẫn": null,
      "Giày": null,
      "Bùa": null,
      "Găng": null,
      "Áo choàng": null,
      "Mão": null,
    },
    inventory: [],
    logs: [],
    activeMission: null,
    shop: [],
    enemy: null,
    meta: {
      lastSavedAt: null,
      lastEnergyTickAt: Date.now(),
      lastStaminaTickAt: Date.now(),
      shopTier: 1,
      shopRefreshCount: 0,
      lastShopRefreshAt: Date.now(),
      bossDefeatedAt: {},
    },
  };
}

let state = createInitialState();
let currentAccount = null;
let currentPage = "overview";
let saveTimer = null;

const els = {
  playerLevel: document.querySelector("#player-level"),
  playerTitle: document.querySelector("#player-title"),
  portraitName: document.querySelector("#portrait-name"),
  portraitLevel: document.querySelector("#portrait-level"),
  goldValue: document.querySelector("#gold-value"),
  hpValue: document.querySelector("#hp-value"),
  strengthStat: document.querySelector("#strength-stat"),
  agilityStat: document.querySelector("#agility-stat"),
  vitalityStat: document.querySelector("#vitality-stat"),
  renownStat: document.querySelector("#renown-stat"),
  powerStat: document.querySelector("#power-stat"),
  inventoryCount: document.querySelector("#inventory-count"),
  bossCount: document.querySelector("#boss-count"),
  inventoryCapacity: document.querySelector("#inventory-capacity"),
  accountName: document.querySelector("#account-name"),
  accountMeta: document.querySelector("#account-meta"),
  accountInput: document.querySelector("#account-input"),
  accountBtn: document.querySelector("#account-btn"),
  energyValue: document.querySelector("#energy-value"),
  staminaValue: document.querySelector("#stamina-value"),
  xpText: document.querySelector("#xp-text"),
  profileHp: document.querySelector("#profile-hp"),
  profileEnergy: document.querySelector("#profile-energy"),
  profileStamina: document.querySelector("#profile-stamina"),
  profileStrength: document.querySelector("#profile-strength"),
  profileAgility: document.querySelector("#profile-agility"),
  profileVitality: document.querySelector("#profile-vitality"),
  profileRenown: document.querySelector("#profile-renown"),
  profileDamage: document.querySelector("#profile-damage"),
  energyBar: document.querySelector("#energy-bar"),
  staminaBar: document.querySelector("#stamina-bar"),
  xpBar: document.querySelector("#xp-bar"),
  energyRegenText: document.querySelector("#energy-regen-text"),
  staminaRegenText: document.querySelector("#stamina-regen-text"),
  missionName: document.querySelector("#mission-name"),
  missionTime: document.querySelector("#mission-time"),
  missionBar: document.querySelector("#mission-bar"),
  dungeonList: document.querySelector("#dungeon-list"),
  enemyPanel: document.querySelector("#enemy-panel"),
  bossList: document.querySelector("#boss-list"),
  pvpList: document.querySelector("#pvp-list"),
  fightBtn: document.querySelector("#fight-btn"),
  rerollEnemy: document.querySelector("#reroll-enemy"),
  refreshShopBtn: document.querySelector("#refresh-shop-btn"),
  refreshShopCost: document.querySelector("#refresh-shop-cost"),
  shopTierLabel: document.querySelector("#shop-tier-label"),
  shopList: document.querySelector("#shop-list"),
  gearList: document.querySelector("#gear-list"),
  inventoryList: document.querySelector("#inventory-list"),
  campPanel: document.querySelector("#camp-panel"),
  logList: document.querySelector("#log-list"),
  saveStatus: document.querySelector("#save-status"),
  navButtons: [...document.querySelectorAll("[data-page-target]")],
  pages: [...document.querySelectorAll("[data-page]")],
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cloneItem(item) {
  return JSON.parse(JSON.stringify(item));
}

function sanitizeAccountName(value) {
  return value.trim().replace(/\s+/g, " ").slice(0, 24);
}

function accountSaveKey(accountName) {
  return `${SAVE_KEY_PREFIX}:${accountName}`;
}

function getAccountRegistry() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ACCOUNT_REGISTRY_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setAccountRegistry(registry) {
  localStorage.setItem(ACCOUNT_REGISTRY_KEY, JSON.stringify(registry));
}

function serializeState() {
  return {
    player: state.player,
    gear: state.gear,
    inventory: state.inventory,
    logs: state.logs,
    activeMission: state.activeMission,
    shop: state.shop,
    enemy: state.enemy,
    meta: {
      ...state.meta,
      lastSavedAt: Date.now(),
    },
  };
}

function updateAccountSnapshot() {
  if (!currentAccount) {
    return;
  }
  const payload = serializeState();
  const registry = getAccountRegistry();
  const entry = {
    accountName: currentAccount,
    updatedAt: payload.meta.lastSavedAt,
    player: payload.player,
    gear: payload.gear,
    meta: payload.meta,
  };
  setAccountRegistry([...registry.filter((item) => item.accountName !== currentAccount), entry]);
}

function saveState() {
  if (!currentAccount) {
    return;
  }
  const payload = serializeState();
  localStorage.setItem(accountSaveKey(currentAccount), JSON.stringify(payload));
  localStorage.setItem(CURRENT_ACCOUNT_KEY, currentAccount);
  state.meta.lastSavedAt = payload.meta.lastSavedAt;
  updateAccountSnapshot();
  els.saveStatus.textContent = `Tự động lưu cho ${currentAccount} lúc ${new Date(payload.meta.lastSavedAt).toLocaleTimeString("vi-VN")}`;
}

function queueSave() {
  if (!currentAccount) {
    return;
  }
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveState, 250);
}

function normalizeSavedItem(item) {
  if (!item) {
    return null;
  }
  const fallbackRarity = rarityTiers.find((tier) => tier.key === item.rarity?.key) ?? rarityTiers[0];
  return {
    ...item,
    rarity: fallbackRarity,
    value: item.value ?? item.cost ?? 20,
  };
}

function restoreState(accountName) {
  const raw = localStorage.getItem(accountSaveKey(accountName));
  if (!raw) {
    return false;
  }
  try {
    const parsed = JSON.parse(raw);
    const base = createInitialState();
    state = {
      ...base,
      ...parsed,
      player: { ...base.player, ...parsed.player },
      gear: Object.fromEntries(
        Object.entries({ ...base.gear, ...parsed.gear }).map(([slot, item]) => [slot, normalizeSavedItem(item)])
      ),
      inventory: Array.isArray(parsed.inventory) ? parsed.inventory.map(normalizeSavedItem) : [],
      logs: Array.isArray(parsed.logs) ? parsed.logs.slice(0, 18) : [],
      shop: Array.isArray(parsed.shop) ? parsed.shop.map(normalizeSavedItem) : [],
      meta: {
        ...base.meta,
        ...parsed.meta,
        bossDefeatedAt: parsed?.meta?.bossDefeatedAt && typeof parsed.meta.bossDefeatedAt === "object" ? parsed.meta.bossDefeatedAt : {},
      },
    };
    return true;
  } catch {
    localStorage.removeItem(accountSaveKey(accountName));
    return false;
  }
}

function currentTitle() {
  return titleTiers.filter((tier) => effectiveStats().renown >= tier.renown).at(-1).title;
}

function effectiveStats() {
  const gearBonus = Object.values(state.gear).filter(Boolean).reduce(
    (acc, item) => {
      acc.strength += item.stats.strength;
      acc.agility += item.stats.agility;
      acc.vitality += item.stats.vitality;
      acc.renown += item.stats.renown;
      return acc;
    },
    { strength: 0, agility: 0, vitality: 0, renown: 0 }
  );

  return {
    strength: state.player.strength + gearBonus.strength,
    agility: state.player.agility + gearBonus.agility,
    vitality: state.player.vitality + gearBonus.vitality,
    renown: state.player.renown + gearBonus.renown,
  };
}

function combatRatingForSnapshot(player, gear = {}) {
  const gearStats = Object.values(gear).filter(Boolean).reduce(
    (acc, item) => {
      acc.strength += item.stats.strength;
      acc.agility += item.stats.agility;
      acc.vitality += item.stats.vitality;
      acc.renown += item.stats.renown;
      return acc;
    },
    { strength: 0, agility: 0, vitality: 0, renown: 0 }
  );
  return Math.round(
    (player.strength + gearStats.strength) * 2.2 +
      (player.agility + gearStats.agility) * 1.8 +
      (player.vitality + gearStats.vitality) * 2.1 +
      player.level * 4.4
  );
}

function combatRating() {
  return combatRatingForSnapshot(state.player, state.gear);
}

function itemScore(item) {
  return item.stats.strength * 2.2 + item.stats.agility * 1.8 + item.stats.vitality * 2.1 + item.stats.renown * 1.4;
}

function staminaRegenMs() {
  return Math.max(60 * 1000, STAMINA_REGEN_BASE_MS - (state.player.level - 1) * STAMINA_REGEN_LEVEL_REDUCTION_MS);
}

function formatDurationShort(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}p`;
  if (minutes > 0) return `${minutes}p ${seconds}s`;
  return `${seconds}s`;
}

function timeUntilNextEnergyTick(now = Date.now()) {
  const elapsed = Math.max(0, now - (state.meta.lastEnergyTickAt ?? now));
  return ENERGY_REGEN_MS - (elapsed % ENERGY_REGEN_MS || ENERGY_REGEN_MS);
}

function timeUntilNextStaminaTick(now = Date.now()) {
  const interval = staminaRegenMs();
  const elapsed = Math.max(0, now - (state.meta.lastStaminaTickAt ?? now));
  return interval - (elapsed % interval || interval);
}

function nextShopRefreshInMs(now = Date.now()) {
  return Math.max(0, SHOP_AUTO_REFRESH_MS - (now - (state.meta.lastShopRefreshAt ?? now)));
}

function bossRespawnRemainingMs(bossId, now = Date.now()) {
  const defeatedAt = state.meta.bossDefeatedAt?.[bossId];
  if (!defeatedAt) {
    return 0;
  }
  return Math.max(0, BOSS_RESPAWN_MS - (now - defeatedAt));
}

function isBossReady(bossId, now = Date.now()) {
  return bossRespawnRemainingMs(bossId, now) === 0;
}

function rarityForLevel(level, bias = 0) {
  const roll = Math.random() * 100 + bias + level * 4.5;
  if (roll >= 130) return rarityTiers[5];
  if (roll >= 104) return rarityTiers[4];
  if (roll >= 82) return rarityTiers[3];
  if (roll >= 56) return rarityTiers[2];
  if (roll >= 32) return rarityTiers[1];
  return rarityTiers[0];
}

function applyRarityToItem(baseItem, rarity, level = state.player.level) {
  const levelFactor = 1 + Math.max(0, level - 1) * 0.09;
  const rarityFactor = rarity.multiplier * levelFactor;
  const item = cloneItem(baseItem);
  item.rarity = rarity;
  item.id = `${baseItem.id ?? baseItem.name}-${rarity.key}-${level}-${randInt(1000, 9999)}`;
  item.name = `${baseItem.name} [${rarity.label}]`;
  item.stats = {
    strength: Math.max(0, Math.round(item.stats.strength * rarityFactor)),
    agility: Math.max(0, Math.round(item.stats.agility * rarityFactor)),
    vitality: Math.max(0, Math.round(item.stats.vitality * rarityFactor)),
    renown: Math.max(0, Math.round(item.stats.renown * Math.max(1, rarity.multiplier / 2) * (1 + Math.max(0, level - 1) * 0.05))),
  };
  const baseValue = baseItem.cost ?? Math.max(20, Math.round(itemScore(baseItem) * 8));
  item.value = Math.max(baseValue, Math.round(baseValue * rarity.multiplier * levelFactor));
  if (typeof baseItem.cost === "number") {
    item.cost = item.value;
  }
  return item;
}

function compareAgainstEquipped(item) {
  const current = state.gear[item.slot];
  if (!current) {
    return { current: null, tone: "good", label: `Ô ${item.slot} đang trống` };
  }
  const delta = Math.round((itemScore(item) - itemScore(current)) * 10) / 10;
  return { current, tone: delta >= 0 ? "good" : "bad", label: `So với đồ mặc: ${delta >= 0 ? "+" : ""}${delta}` };
}

function addLog(text, tone = "good") {
  state.logs.unshift({
    text,
    tone,
    time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
  });
  state.logs = state.logs.slice(0, 18);
  renderLogs();
  queueSave();
}

function pickRandomUnique(list, count) {
  const pool = [...list];
  const picked = [];
  while (pool.length && picked.length < count) {
    picked.push(pool.splice(randInt(0, pool.length - 1), 1)[0]);
  }
  return picked;
}

function shopTierForLevel(level) {
  if (level >= 9) return 5;
  if (level >= 7) return 4;
  if (level >= 5) return 3;
  if (level >= 3) return 2;
  return 1;
}

function currentRefreshCost() {
  return 30 + shopTierForLevel(state.player.level) * 18 + state.meta.shopRefreshCount * 12;
}

function ensureShopForLevel(force = false, reason = "level") {
  const tier = shopTierForLevel(state.player.level);
  const needRefresh = force || state.shop.length === 0 || state.meta.shopTier !== tier;
  if (!needRefresh) {
    return;
  }
  const available = itemCatalog.filter((item) => item.minLevel <= state.player.level + 1);
  state.shop = pickRandomUnique(available, Math.min(6, available.length)).map((item) =>
    applyRarityToItem(item, rarityForLevel(state.player.level, 8), state.player.level)
  );
  state.meta.shopTier = tier;
  state.meta.lastShopRefreshAt = Date.now();
  if (force && reason === "manual") {
    state.meta.shopRefreshCount += 1;
  } else if (reason === "timer") {
    addLog("Chợ đêm vừa tự thay lô hàng mới sau 60 phút.", "good");
  } else if (state.player.level > 1) {
    addLog("Chợ đêm vừa nhập lô hàng mới theo mốc cấp hiện tại.", "good");
  }
}

function createEnemy() {
  const expected = combatRating();
  const enemyLevel = Math.max(1, state.player.level + randInt(-1, 2));
  const power = Math.max(18, Math.round(expected / 4 + enemyLevel * 5 + randInt(-6, 10)));
  state.enemy = {
    name: enemyNames[randInt(0, enemyNames.length - 1)],
    level: enemyLevel,
    power,
    goldReward: Math.floor(power * 1.8),
    xpReward: Math.floor(power * 1.3),
    renownReward: randInt(5, 12),
  };
}

function generateLoot(powerHint) {
  const item = cloneItem(lootTable[randInt(0, lootTable.length - 1)]);
  const bonus = Math.max(1, Math.floor(powerHint / 14));
  item.stats.strength += randInt(0, bonus);
  item.stats.agility += randInt(0, bonus);
  item.stats.vitality += randInt(0, bonus);
  return applyRarityToItem(item, rarityForLevel(state.player.level, powerHint / 3), state.player.level);
}

function makeRewardItem(item) {
  return applyRarityToItem(item, rarityForLevel(state.player.level, 40), state.player.level);
}

function pushInventory(item, sourceLabel) {
  if (state.inventory.length >= INVENTORY_LIMIT) {
    const gold = Math.max(16, Math.round((item.value ?? 20) * 0.55));
    state.player.gold += gold;
    addLog(`Kho đầy. ${item.name} từ ${sourceLabel} đổi ngay thành ${gold} vàng.`, "bad");
    return;
  }
  state.inventory.unshift(normalizeSavedItem(item));
  addLog(`${item.name} từ ${sourceLabel} đã được đưa vào kho.`, "good");
}

function autoHandleRewardItem(item, sourceLabel) {
  const current = state.gear[item.slot];
  if (!current || itemScore(item) > itemScore(current)) {
    if (current) {
      pushInventory(current, "ô trang bị");
    }
    state.gear[item.slot] = item;
    addLog(`${item.name} từ ${sourceLabel} mạnh hơn và đã được trang bị ngay.`, "good");
  } else {
    pushInventory(item, sourceLabel);
  }
}

function equipItemFromInventory(index) {
  const item = state.inventory[index];
  if (!item) {
    return;
  }
  state.inventory.splice(index, 1);
  const current = state.gear[item.slot];
  if (current) {
    pushInventory(current, "ô trang bị");
  }
  state.gear[item.slot] = item;
  addLog(`Đã trang bị ${item.name} vào ô ${item.slot}.`, "good");
  render();
  queueSave();
}

function sellInventoryItem(index) {
  const item = state.inventory[index];
  if (!item) {
    return;
  }
  const payout = Math.max(12, Math.round((item.value ?? 20) * 0.65));
  state.inventory.splice(index, 1);
  state.player.gold += payout;
  addLog(`Bán ${item.name} lấy ${payout} vàng.`, "good");
  render();
  queueSave();
}

function gainXp(amount) {
  state.player.xp += amount;
  let leveled = false;
  while (state.player.xp >= state.player.xpToNext) {
    state.player.xp -= state.player.xpToNext;
    state.player.level += 1;
    state.player.xpToNext = Math.floor(state.player.xpToNext * 1.32);
    state.player.strength += 2;
    state.player.agility += 2;
    state.player.vitality += 3;
    state.player.maxHp += 18;
    state.player.maxEnergy += 2;
    state.player.maxStamina += 1;
    state.player.hp = state.player.maxHp;
    state.player.energy = state.player.maxEnergy;
    state.player.stamina = state.player.maxStamina;
    leveled = true;
    addLog(`Lên cấp ${state.player.level}. Bạn được hồi đầy máu, mana và stamina.`, "good");
  }
  if (leveled) {
    state.meta.shopRefreshCount = 0;
    ensureShopForLevel(true, "level");
  }
}

function applyPassiveRegen(now = Date.now()) {
  const energyElapsed = Math.max(0, now - (state.meta.lastEnergyTickAt ?? now));
  const staminaElapsed = Math.max(0, now - (state.meta.lastStaminaTickAt ?? now));
  const staminaInterval = staminaRegenMs();
  const energyGain = Math.floor(energyElapsed / ENERGY_REGEN_MS);
  const staminaGain = Math.floor(staminaElapsed / staminaInterval);

  if (energyGain > 0) {
    state.player.energy = Math.min(state.player.maxEnergy, state.player.energy + energyGain);
    state.meta.lastEnergyTickAt += energyGain * ENERGY_REGEN_MS;
  }
  if (staminaGain > 0) {
    state.player.stamina = Math.min(state.player.maxStamina, state.player.stamina + staminaGain);
    state.meta.lastStaminaTickAt += staminaGain * staminaInterval;
  }
  if (nextShopRefreshInMs(now) === 0) {
    state.meta.shopRefreshCount = 0;
    ensureShopForLevel(true, "timer");
  }
  if (energyGain > 0 || staminaGain > 0) {
    queueSave();
  }
}

function startDungeon(id) {
  if (!currentAccount || state.activeMission) {
    return;
  }
  const dungeon = dungeons.find((entry) => entry.id === id);
  if (!dungeon) {
    return;
  }
  if (state.player.level < dungeon.requiredLevel || state.player.energy < dungeon.energyCost) {
    return;
  }
  state.player.energy -= dungeon.energyCost;
  state.activeMission = {
    ...dungeon,
    startedAt: Date.now(),
    endsAt: Date.now() + dungeon.duration * 1000,
  };
  addLog(`Bắt đầu dungeon ${dungeon.name}.`, "good");
  render();
  queueSave();
}

function finishMission(mode = "normal") {
  if (!state.activeMission) {
    return;
  }
  const mission = state.activeMission;
  const successChance = Math.max(0.46, Math.min(0.93, combatRating() / (combatRating() + mission.danger * 10)));
  const success = Math.random() < successChance;

  if (success) {
    const gold = randInt(...mission.goldRange);
    const xp = randInt(...mission.xpRange);
    state.player.gold += gold;
    gainXp(xp);
    addLog(
      mode === "offline"
        ? `${mission.name} hoàn tất khi bạn vắng mặt: +${gold} vàng, +${xp} XP.`
        : `Hoàn thành ${mission.name}, nhận ${gold} vàng và ${xp} XP.`,
      "good"
    );
    if (Math.random() < mission.lootChance) {
      autoHandleRewardItem(generateLoot(mission.danger), mission.name);
    }
  } else {
    const hpLoss = randInt(8, 18);
    state.player.hp = Math.max(1, state.player.hp - hpLoss);
    addLog(
      mode === "offline"
        ? `${mission.name} thất bại lúc bạn vắng mặt. Mất ${hpLoss} máu khi rút lui.`
        : `${mission.name} thất bại, mất ${hpLoss} máu.`,
      "bad"
    );
  }

  state.activeMission = null;
  render();
  queueSave();
}

function fightEnemy() {
  if (!currentAccount || !state.enemy || state.player.stamina < 1) {
    return;
  }
  state.player.stamina -= 1;
  const playerPower = combatRating() + randInt(-10, 14);
  const enemyPower = state.enemy.power * 3 + randInt(-14, 14);
  if (playerPower >= enemyPower) {
    state.player.gold += state.enemy.goldReward;
    state.player.renown += state.enemy.renownReward;
    gainXp(state.enemy.xpReward);
    addLog(`Hạ ${state.enemy.name}: +${state.enemy.goldReward} vàng, +${state.enemy.xpReward} XP, +${state.enemy.renownReward} uy danh.`, "good");
    if (Math.random() < 0.38) {
      autoHandleRewardItem(generateLoot(state.enemy.power), "đấu trường");
    }
  } else {
    const hpLoss = randInt(10, 24);
    state.player.hp = Math.max(1, state.player.hp - hpLoss);
    addLog(`Thua ${state.enemy.name}, mất ${hpLoss} máu và 1 stamina.`, "bad");
  }
  createEnemy();
  render();
  queueSave();
}

function challengeBoss(id) {
  if (!currentAccount) {
    return;
  }
  const boss = bosses.find((entry) => entry.id === id);
  if (!boss || !isBossReady(id)) {
    return;
  }
  if (state.player.level < boss.requiredLevel || state.player.energy < boss.energyCost || state.player.hp < 20) {
    return;
  }
  state.player.energy -= boss.energyCost;
  const playerPower = combatRating() + randInt(-8, 14);
  const bossPower = boss.recommendedPower + randInt(-10, 18);
  if (playerPower >= bossPower) {
    state.player.gold += boss.reward.gold;
    state.player.renown += boss.reward.renown;
    gainXp(boss.reward.xp);
    state.meta.bossDefeatedAt[boss.id] = Date.now();
    addLog(`Đã hạ boss ${boss.name}: +${boss.reward.gold} vàng, +${boss.reward.xp} XP, +${boss.reward.renown} uy danh.`, "good");
    autoHandleRewardItem(makeRewardItem(boss.reward.item), boss.name);
  } else {
    const hpLoss = randInt(18, 34);
    state.player.hp = Math.max(1, state.player.hp - hpLoss);
    addLog(`Boss ${boss.name} áp đảo bạn. Mất ${hpLoss} máu và boss vẫn còn sống.`, "bad");
  }
  render();
  queueSave();
}

function buyItem(id) {
  if (!currentAccount) {
    return;
  }
  const item = state.shop.find((entry) => entry.id === id);
  if (!item || state.player.gold < item.cost) {
    return;
  }
  state.player.gold -= item.cost;
  state.shop = state.shop.filter((entry) => entry.id !== id);
  autoHandleRewardItem(item, "chợ đêm");
  addLog(`Mua ${item.name} với giá ${item.cost} vàng.`, "good");
  render();
  queueSave();
}

function refreshShop() {
  if (!currentAccount) {
    return;
  }
  const cost = currentRefreshCost();
  if (state.player.gold < cost) {
    return;
  }
  state.player.gold -= cost;
  ensureShopForLevel(true, "manual");
  addLog(`Đã chi ${cost} vàng để làm mới chợ đêm.`, "good");
  render();
  queueSave();
}

function restAtCamp(type) {
  if (!currentAccount) {
    return;
  }
  if (type === "field-medic") {
    if (state.player.hp >= state.player.maxHp || state.player.gold < 26) return;
    const heal = Math.min(state.player.maxHp - state.player.hp, 32);
    state.player.gold -= 26;
    state.player.hp += heal;
    addLog(`Người vá thịt hồi cho bạn ${heal} máu với giá 26 vàng.`, "good");
  }
  if (type === "black-broth") {
    if ((state.player.hp >= state.player.maxHp && state.player.energy >= state.player.maxEnergy) || state.player.gold < 48) return;
    state.player.gold -= 48;
    state.player.hp = Math.min(state.player.maxHp, state.player.hp + 18);
    state.player.energy = Math.min(state.player.maxEnergy, state.player.energy + 4);
    addLog("Canh đen đã hồi máu và bơm thêm mana cho chuyến đi kế tiếp.", "good");
  }
  render();
  queueSave();
}

function challengePlayer(accountName) {
  if (!currentAccount || accountName === currentAccount) {
    return;
  }
  if (state.player.stamina < 1) {
    return;
  }
  const raw = localStorage.getItem(accountSaveKey(accountName));
  if (!raw) {
    return;
  }
  let opponentState;
  try {
    opponentState = JSON.parse(raw);
  } catch {
    return;
  }
  state.player.stamina -= 1;
  const playerPower = combatRating() + randInt(-12, 16);
  const opponentPower = combatRatingForSnapshot(opponentState.player, opponentState.gear) + randInt(-12, 16);
  const stealGold = Math.max(12, Math.min(Math.floor(opponentState.player.gold * 0.15), 180 + opponentState.player.level * 12));

  if (playerPower >= opponentPower) {
    const payout = Math.min(opponentState.player.gold, stealGold);
    opponentState.player.gold -= payout;
    state.player.gold += payout;
    state.player.renown += 6;
    gainXp(22 + opponentState.player.level * 5);
    localStorage.setItem(accountSaveKey(accountName), JSON.stringify(opponentState));
    addLog(`Thắng PvP trước ${accountName} và cướp ${payout} vàng.`, "good");
  } else {
    const payout = Math.min(state.player.gold, Math.max(8, Math.floor(stealGold * 0.55)));
    state.player.gold -= payout;
    opponentState.player.gold += payout;
    const hpLoss = randInt(8, 20);
    state.player.hp = Math.max(1, state.player.hp - hpLoss);
    localStorage.setItem(accountSaveKey(accountName), JSON.stringify(opponentState));
    addLog(`Thua PvP trước ${accountName}, mất ${payout} vàng và ${hpLoss} máu.`, "bad");
  }

  render();
  queueSave();
}

function setPage(pageName) {
  currentPage = pageName;
  els.pages.forEach((page) => page.classList.toggle("active", page.dataset.page === pageName));
  els.navButtons.forEach((button) => button.classList.toggle("active", button.dataset.pageTarget === pageName));
}

function loginOrCreateAccount() {
  const accountName = sanitizeAccountName(els.accountInput.value);
  if (!accountName) {
    els.accountMeta.textContent = "Nhập tên tài khoản để tạo mới hoặc đăng nhập.";
    return;
  }
  currentAccount = accountName;
  const loaded = restoreState(accountName);
  if (!loaded) {
    state = createInitialState();
    ensureShopForLevel(true, "signup");
    createEnemy();
    addLog(`Tài khoản ${accountName} vừa được tạo.`, "good");
    saveState();
  } else {
    applyPassiveRegen(Date.now());
    if (!state.enemy) {
      createEnemy();
    }
    if (state.activeMission && Date.now() >= state.activeMission.endsAt) {
      finishMission("offline");
    }
    addLog(`Đã đăng nhập lại tài khoản ${accountName}.`, "good");
  }
  els.accountInput.value = "";
  render();
}

function renderPlayer() {
  const stats = effectiveStats();
  const power = combatRating();
  els.playerTitle.textContent = currentTitle();
  els.portraitName.textContent = currentTitle();
  els.playerLevel.textContent = `Lv. ${state.player.level}`;
  els.portraitLevel.textContent = `Lv. ${state.player.level}`;
  els.goldValue.textContent = state.player.gold.toString();
  els.hpValue.textContent = `${state.player.hp} / ${state.player.maxHp}`;
  els.strengthStat.textContent = stats.strength.toString();
  els.agilityStat.textContent = stats.agility.toString();
  els.vitalityStat.textContent = stats.vitality.toString();
  els.renownStat.textContent = stats.renown.toString();
  els.powerStat.textContent = power.toString();
  els.inventoryCount.textContent = `${state.inventory.length} / ${INVENTORY_LIMIT}`;
  els.bossCount.textContent = `${bosses.filter((boss) => isBossReady(boss.id)).length} / ${bosses.length}`;
  els.inventoryCapacity.textContent = `${state.inventory.length} / ${INVENTORY_LIMIT} ô`;
  els.energyValue.textContent = `${state.player.energy} / ${state.player.maxEnergy}`;
  els.staminaValue.textContent = `${state.player.stamina} / ${state.player.maxStamina}`;
  els.xpText.textContent = `${state.player.xp} / ${state.player.xpToNext}`;
  els.profileHp.textContent = `${state.player.hp} / ${state.player.maxHp}`;
  els.profileEnergy.textContent = `${state.player.energy} / ${state.player.maxEnergy}`;
  els.profileStamina.textContent = `${state.player.stamina} / ${state.player.maxStamina}`;
  els.profileStrength.textContent = stats.strength.toString();
  els.profileAgility.textContent = stats.agility.toString();
  els.profileVitality.textContent = stats.vitality.toString();
  els.profileRenown.textContent = stats.renown.toString();
  els.profileDamage.textContent = `${Math.max(1, power - 18)} - ${power + 12}`;
  els.energyBar.style.width = `${(state.player.energy / state.player.maxEnergy) * 100}%`;
  els.staminaBar.style.width = `${(state.player.stamina / state.player.maxStamina) * 100}%`;
  els.xpBar.style.width = `${(state.player.xp / state.player.xpToNext) * 100}%`;
  els.energyRegenText.textContent = `+1 mana mỗi phút · còn ${formatDurationShort(timeUntilNextEnergyTick())}`;
  els.staminaRegenText.textContent = `+1 stamina mỗi ${formatDurationShort(staminaRegenMs())} · còn ${formatDurationShort(timeUntilNextStaminaTick())}`;
  els.accountName.textContent = currentAccount ?? "Chưa đăng nhập";
  els.accountMeta.textContent = currentAccount ? "Tiến trình được tự động lưu theo tài khoản." : "Tạo hoặc đăng nhập tài khoản để bắt đầu chơi.";
  if (!state.meta.lastSavedAt || !currentAccount) {
    els.saveStatus.textContent = "Tự động lưu sẽ hoạt động ngay khi bạn vào tài khoản.";
  }
}

function renderDungeons() {
  els.dungeonList.innerHTML = dungeons
    .map((dungeon) => {
      const locked = state.player.level < dungeon.requiredLevel;
      const disabled = !currentAccount || locked || Boolean(state.activeMission) || state.player.energy < dungeon.energyCost;
      return `
        <button class="action-btn" data-dungeon-id="${dungeon.id}" ${disabled ? "disabled" : ""}>
          <div class="action-topline">
            <div>
              <div class="action-title">Dungeon: ${dungeon.name}</div>
              <div class="item-subtext">${dungeon.duration}s · Tốn ${dungeon.energyCost} mana · Loot ${Math.round(dungeon.lootChance * 100)}%</div>
            </div>
            <span class="pill req-pill ${locked ? "locked" : ""}">Lv ${dungeon.requiredLevel}+</span>
          </div>
          <div class="pill-row">
            <span class="pill">Vàng ${dungeon.goldRange[0]}-${dungeon.goldRange[1]}</span>
            <span class="pill">XP ${dungeon.xpRange[0]}-${dungeon.xpRange[1]}</span>
            <span class="pill">Nguy hiểm ${dungeon.danger}</span>
          </div>
        </button>
      `;
    })
    .join("");
}

function renderMission() {
  if (!state.activeMission) {
    els.missionName.textContent = "Chưa có hoạt động đang chạy";
    els.missionTime.textContent = "0s";
    els.missionBar.style.width = "0%";
    return;
  }
  const total = state.activeMission.duration * 1000;
  const remaining = Math.max(0, state.activeMission.endsAt - Date.now());
  const progress = Math.max(0, Math.min(100, ((total - remaining) / total) * 100));
  els.missionName.textContent = state.activeMission.name;
  els.missionTime.textContent = formatDurationShort(remaining);
  els.missionBar.style.width = `${progress}%`;
}

function renderEnemy() {
  if (!state.enemy) {
    els.enemyPanel.innerHTML = "<div>Chưa có đối thủ.</div>";
    return;
  }
  const threat = state.enemy.power > combatRating() / 2 ? "Nguy hiểm" : "Vừa sức";
  els.enemyPanel.innerHTML = `
    <div class="enemy-topline">
      <div>
        <div class="enemy-name">${state.enemy.name}</div>
        <div class="enemy-subtext">Đối thủ cấp ${state.enemy.level}. Đánh giá hiện tại: ${threat}.</div>
      </div>
      <span class="badge">Power ${state.enemy.power}</span>
    </div>
    <div class="pill-row">
      <span class="pill">Thưởng ${state.enemy.goldReward} vàng</span>
      <span class="pill">${state.enemy.xpReward} XP</span>
      <span class="pill">${state.enemy.renownReward} uy danh</span>
      <span class="pill">Tốn 1 stamina</span>
    </div>
  `;
}

function renderBosses() {
  els.bossList.innerHTML = bosses
    .map((boss) => {
      const locked = state.player.level < boss.requiredLevel;
      const remaining = bossRespawnRemainingMs(boss.id);
      const ready = remaining === 0;
      const disabled = !currentAccount || locked || !ready || state.player.energy < boss.energyCost || state.player.hp < 20;
      return `
        <article class="list-item">
          <div class="item-topline">
            <div>
              <div class="item-name">${boss.name}</div>
              <div class="item-subtext">Boss mốc cấp ${boss.requiredLevel}. Nên vào khi Power khoảng ${boss.recommendedPower}+.</div>
            </div>
            <span class="pill req-pill ${ready ? "" : "locked"}">${ready ? `Lv ${boss.requiredLevel}+` : `Hồi sau ${formatDurationShort(remaining)}`}</span>
          </div>
          <div class="pill-row">
            <span class="pill">Tốn ${boss.energyCost} mana</span>
            <span class="pill">${boss.reward.gold} vàng</span>
            <span class="pill">${boss.reward.xp} XP</span>
            <span class="pill">${boss.reward.renown} uy danh</span>
          </div>
          <div class="item-actions">
            <button class="primary-btn" data-boss-id="${boss.id}" ${disabled ? "disabled" : ""}>${ready ? "Thách boss" : "Đang hồi"}</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderShop() {
  const tier = shopTierForLevel(state.player.level);
  els.shopTierLabel.textContent = `Chợ đêm đang ở tier ${tier}. Hàng mở rộng dần theo cấp nhân vật.`;
  els.refreshShopCost.textContent = `Phí: ${currentRefreshCost()} vàng · Tự reset sau ${formatDurationShort(nextShopRefreshInMs())}`;
  els.refreshShopBtn.disabled = !currentAccount || state.player.gold < currentRefreshCost();
  if (state.shop.length === 0) {
    els.shopList.innerHTML = `<div class="list-item empty-copy">Chợ đêm đang trống. Hãy đăng nhập tài khoản hoặc chờ shop làm mới.</div>`;
    return;
  }
  els.shopList.innerHTML = state.shop
    .map((item) => {
      const rarity = item.rarity ?? rarityTiers[0];
      const comparison = compareAgainstEquipped(item);
      return `
        <article class="list-item">
          <div class="item-topline">
            <div>
              <div class="slot-name">${item.slot}</div>
              <div class="item-name">${item.name}</div>
              <div class="item-subtext">Mở từ level ${item.minLevel ?? 1} · ${item.desc ?? "Trang bị chiến lợi phẩm"}</div>
            </div>
            <div class="item-price">${item.cost} vàng</div>
          </div>
          <div class="pill-row">
            <span class="pill ${rarity.className}">${rarity.label}</span>
            <span class="pill">STR +${item.stats.strength}</span>
            <span class="pill">AGI +${item.stats.agility}</span>
            <span class="pill">VIT +${item.stats.vitality}</span>
            <span class="pill">REN +${item.stats.renown}</span>
            <span class="pill ${comparison.tone}">${comparison.label}</span>
            ${comparison.current ? `<span class="pill">Đang mặc: ${comparison.current.name}</span>` : ""}
          </div>
          <button class="buy-btn" data-buy-id="${item.id}" ${!currentAccount || state.player.gold < item.cost ? "disabled" : ""}>Mua ngay</button>
        </article>
      `;
    })
    .join("");
}

function renderGear() {
  els.gearList.innerHTML = Object.entries(state.gear)
    .map(([slot, item]) => `
      <article class="paperdoll-slot ${item ? "" : "empty"}">
        <div class="slot-name">${slot}</div>
        <div class="slot-copy">
          <span class="paperdoll-icon">${slotIcons[slot] ?? "◆"}</span>
          ${
            item
              ? `<strong>${item.name}</strong><div class="item-subtext">${item.rarity?.label ?? "Trắng"} · STR +${item.stats.strength} · AGI +${item.stats.agility} · VIT +${item.stats.vitality} · REN +${item.stats.renown}</div>`
              : `<strong>Ô ${slot}</strong><div class="item-subtext">Chưa có trang bị.</div>`
          }
        </div>
      </article>
    `)
    .join("");
}

function renderInventory() {
  if (state.inventory.length === 0) {
    els.inventoryList.innerHTML = `<div class="inventory-tile empty-tile">Kho đang trống. Đồ không đủ mạnh để auto-equip sẽ rơi vào đây.</div>`;
    return;
  }
  els.inventoryList.innerHTML = state.inventory
    .map((item, index) => {
      const comparison = compareAgainstEquipped(item);
      return `
        <article class="inventory-tile">
          <div class="item-topline">
            <div>
              <div class="slot-name">${item.slot}</div>
              <div class="item-name">${item.name}</div>
              <div class="item-subtext">STR +${item.stats.strength} · AGI +${item.stats.agility} · VIT +${item.stats.vitality} · REN +${item.stats.renown}</div>
            </div>
            <div class="item-price">${item.value} vàng</div>
          </div>
          <div class="pill-row">
            <span class="pill ${item.rarity?.className ?? "rarity-common"}">${item.rarity?.label ?? "Trắng"}</span>
            <span class="pill ${comparison.tone}">${comparison.label}</span>
          </div>
          <div class="item-actions">
            <button class="inventory-btn" data-equip-index="${index}" ${!currentAccount ? "disabled" : ""}>Trang bị</button>
            <button class="inventory-btn sell" data-sell-index="${index}" ${!currentAccount ? "disabled" : ""}>Bán</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCamp() {
  const medicDisabled = !currentAccount || state.player.gold < 26 || state.player.hp >= state.player.maxHp;
  const brothDisabled = !currentAccount || state.player.gold < 48 || (state.player.hp >= state.player.maxHp && state.player.energy >= state.player.maxEnergy);
  els.campPanel.innerHTML = `
    <article class="guide-box">
      <span>Trạm vá thịt</span>
      <strong>Hồi 32 máu</strong>
      <p>Phù hợp khi vừa thua đấu trường hoặc trước lúc đánh boss. Giá 26 vàng.</p>
      <button class="camp-btn" data-camp-action="field-medic" ${medicDisabled ? "disabled" : ""}>Dùng dịch vụ</button>
    </article>
    <article class="guide-box">
      <span>Nồi canh đen</span>
      <strong>+18 máu, +4 mana</strong>
      <p>Gói hồi phục đa dụng cho các nhịp farm liên tục. Giá 48 vàng.</p>
      <button class="camp-btn" data-camp-action="black-broth" ${brothDisabled ? "disabled" : ""}>Uống ngay</button>
    </article>
    <article class="guide-box">
      <span>Khuyến nghị</span>
      <strong>Chuẩn bị trước boss</strong>
      <p>Boss hồi sau mỗi 60 phút khi bị hạ. Theo dõi bộ đếm và chuẩn bị build trước khi vào trận.</p>
    </article>
  `;
}

function renderLogs() {
  els.logList.innerHTML = state.logs
    .map(
      (log) => `
        <article class="log-item list-item">
          <strong class="${log.tone}">${log.text}</strong>
          <small>${log.time}</small>
        </article>
      `
    )
    .join("");
}

function renderPvp() {
  const registry = getAccountRegistry()
    .filter((entry) => entry.accountName !== currentAccount)
    .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))
    .slice(0, 6);

  if (registry.length === 0) {
    els.pvpList.innerHTML = `<div class="list-item empty-copy">Chưa có tài khoản đối thủ nào trong trình duyệt này. Hãy tạo thêm account để thử PvP local.</div>`;
    return;
  }

  els.pvpList.innerHTML = registry
    .map((entry) => {
      const enemyPower = combatRatingForSnapshot(entry.player, entry.gear);
      const stealEstimate = Math.max(12, Math.min(Math.floor(entry.player.gold * 0.15), 180 + entry.player.level * 12));
      return `
        <article class="list-item">
          <div class="item-topline">
            <div>
              <div class="item-name">${entry.accountName}</div>
              <div class="item-subtext">Lv ${entry.player.level} · Power ${enemyPower} · Vàng ${entry.player.gold}</div>
            </div>
            <span class="pill">Cướp tối đa ${stealEstimate} vàng</span>
          </div>
          <div class="pill-row">
            <span class="pill">HP ${entry.player.hp}/${entry.player.maxHp}</span>
            <span class="pill">Mana ${entry.player.energy}/${entry.player.maxEnergy}</span>
            <span class="pill">Stamina ${entry.player.stamina}/${entry.player.maxStamina}</span>
          </div>
          <button class="primary-btn" data-pvp-account="${entry.accountName}" ${!currentAccount || state.player.stamina < 1 ? "disabled" : ""}>Thách đấu</button>
        </article>
      `;
    })
    .join("");
}

function renderButtons() {
  els.fightBtn.disabled = !currentAccount || !state.enemy || state.player.stamina < 1;
}

function render() {
  renderPlayer();
  renderDungeons();
  renderMission();
  renderEnemy();
  renderBosses();
  renderShop();
  renderGear();
  renderInventory();
  renderCamp();
  renderLogs();
  renderPvp();
  renderButtons();
}

function initializeSession() {
  const remembered = localStorage.getItem(CURRENT_ACCOUNT_KEY);
  if (remembered && restoreState(remembered)) {
    currentAccount = remembered;
    applyPassiveRegen(Date.now());
    if (!state.enemy) {
      createEnemy();
    }
    if (state.activeMission && Date.now() >= state.activeMission.endsAt) {
      finishMission("offline");
    }
    addLog(`Đã đăng nhập lại tài khoản ${remembered}.`, "good");
  } else {
    state = createInitialState();
    ensureShopForLevel(true, "boot");
    createEnemy();
  }
  render();
}

document.addEventListener("click", (event) => {
  const navButton = event.target.closest("[data-page-target]");
  const dungeonButton = event.target.closest("[data-dungeon-id]");
  const buyButton = event.target.closest("[data-buy-id]");
  const bossButton = event.target.closest("[data-boss-id]");
  const equipButton = event.target.closest("[data-equip-index]");
  const sellButton = event.target.closest("[data-sell-index]");
  const campButton = event.target.closest("[data-camp-action]");
  const pvpButton = event.target.closest("[data-pvp-account]");

  if (navButton) {
    setPage(navButton.dataset.pageTarget);
  }
  if (dungeonButton) {
    startDungeon(dungeonButton.dataset.dungeonId);
  }
  if (buyButton) {
    buyItem(buyButton.dataset.buyId);
  }
  if (bossButton) {
    challengeBoss(bossButton.dataset.bossId);
  }
  if (equipButton) {
    equipItemFromInventory(Number(equipButton.dataset.equipIndex));
  }
  if (sellButton) {
    sellInventoryItem(Number(sellButton.dataset.sellIndex));
  }
  if (campButton) {
    restAtCamp(campButton.dataset.campAction);
  }
  if (pvpButton) {
    challengePlayer(pvpButton.dataset.pvpAccount);
  }
});

els.accountBtn.addEventListener("click", loginOrCreateAccount);
els.accountInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    loginOrCreateAccount();
  }
});
els.fightBtn.addEventListener("click", fightEnemy);
els.rerollEnemy.addEventListener("click", () => {
  createEnemy();
  addLog("Đã dò lại danh sách đối thủ trong đấu trường.", "good");
  render();
});
els.refreshShopBtn.addEventListener("click", refreshShop);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    applyPassiveRegen(Date.now());
    if (state.activeMission && Date.now() >= state.activeMission.endsAt) {
      finishMission("offline");
    }
    render();
  } else {
    saveState();
  }
});

window.addEventListener("beforeunload", saveState);

setInterval(() => {
  applyPassiveRegen(Date.now());
  if (state.activeMission && Date.now() >= state.activeMission.endsAt) {
    finishMission();
  }
  renderMission();
  renderPlayer();
  renderBosses();
  renderShop();
  renderPvp();
  renderButtons();
}, 1000);

setPage(currentPage);
initializeSession();
