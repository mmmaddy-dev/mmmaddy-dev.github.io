// =====================
// AGENT DATA
// =====================

const agents = [
  {
    name: "Astra",
    role: "Controller",
  },
  {
    name: "Breach",
    role: "Initiator",
  },
  {
    name: "Brimstone",
    role: "Controller",
  },
  {
    name: "Chamber",
    role: "Sentinel",
  },
  {
    name: "Clove",
    role: "Controller",
  },
  {
    name: "Cypher",
    role: "Sentinel",
  },
  {
    name: "Deadlock",
    role: "Sentinel",
  },
  {
    name: "Fade",
    role: "Initiator",
  },
  {
    name: "Gekko",
    role: "Initiator",
  },
  {
    name: "Harbor",
    role: "Controller",
  },
  {
    name: "Iso",
    role: "Duelist",
  },
  {
    name: "Jett",
    role: "Duelist",
  },
  {
    name: "KAYO",
    role: "Initiator",
  },
  {
    name: "Killjoy",
    role: "Sentinel",
  },
  {
    name: "Miks",
    role: "Controller",
  },
  {
    name: "Neon",
    role: "Duelist",
  },
  {
    name: "Omen",
    role: "Controller",
  },
  {
    name: "Phoenix",
    role: "Duelist",
  },
  {
    name: "Raze",
    role: "Duelist",
  },
  {
    name: "Reyna",
    role: "Duelist",
  },
  {
    name: "Sage",
    role: "Sentinel",
  },
  {
    name: "Skye",
    role: "Initiator",
  },
  {
    name: "Sova",
    role: "Initiator",
  },
  {
    name: "Tejo",
    role: "Initiator",
  },
  {
    name: "Veto",
    role: "Sentinel",
  },
  {
    name: "Viper",
    role: "Controller",
  },
  {
    name: "Vyse",
    role: "Sentinel",
  },
  {
    name: "Waylay",
    role: "Duelist",
  },
  {
    name: "Yoru",
    role: "Duelist",
  }
];

// =====================
// STATE
// =====================

let enabledAgents = new Set(agents.map(agent => agent.name));

let playerAssignments = [];

// =====================
// DOM
// =====================

const agentPool = document.getElementById("agentPool");
const playersContainer = document.getElementById("playersContainer");
const randomizeBtn = document.getElementById("randomizeBtn");
const playerCountSelect = document.getElementById("playerCount");

// =====================
// CREATE AGENT POOL
// =====================

function renderAgentPool() {

  agentPool.innerHTML = "";

  const roles = [
    "Duelist",
    "Initiator",
    "Controller",
    "Sentinel"
  ];

  roles.forEach(role => {

    const roleSection =
      document.createElement("div");

    roleSection.classList.add("role-section");

    // HEADER

    const header =
      document.createElement("div");

    header.classList.add("role-header");

    header.innerHTML = `
      <h3>${role}</h3>

      <div class="role-actions">
        <button class="mini-btn select-all">
          Select All
        </button>

        <button class="mini-btn unselect-all">
          Unselect All
        </button>

        <button class="mini-btn only-role">
          Just This Role
        </button>
      </div>
    `;

    roleSection.appendChild(header);

    // GRID

    const roleGrid =
      document.createElement("div");

    roleGrid.classList.add("role-grid");

    const roleAgents = agents.filter(
      agent => agent.role === role
    );

    roleAgents.forEach(agent => {

      const card =
        document.createElement("div");

      card.classList.add("agent-card");

      if (!enabledAgents.has(agent.name)) {
        card.classList.add("disabled");
      }

      card.innerHTML = `
        <img src="images/headshots/${agent.name.toLowerCase()}.png">

        <p>${agent.name}</p>
      `;

      card.addEventListener("click", () => {
        toggleAgent(agent.name);
      });

      roleGrid.appendChild(card);
    });

    roleSection.appendChild(roleGrid);

    // BUTTON LOGIC

    const selectAllBtn =
      header.querySelector(".select-all");

    const unselectAllBtn =
      header.querySelector(".unselect-all");

    const onlyRoleBtn =
      header.querySelector(".only-role");

    // SELECT ALL

    selectAllBtn.addEventListener(
      "click",
      () => {

        roleAgents.forEach(agent => {
          enabledAgents.add(agent.name);
        });

        renderAgentPool();
      }
    );

    // UNSELECT ALL

    unselectAllBtn.addEventListener(
      "click",
      () => {

        roleAgents.forEach(agent => {
          enabledAgents.delete(agent.name);
        });

        renderAgentPool();
      }
    );

    // JUST THIS ROLE

    onlyRoleBtn.addEventListener(
      "click",
      () => {

        enabledAgents.clear();

        roleAgents.forEach(agent => {
          enabledAgents.add(agent.name);
        });

        renderAgentPool();
      }
    );

    agentPool.appendChild(roleSection);
  });
}

// =====================
// TOGGLE AGENT
// =====================

function toggleAgent(agentName) {

  if (enabledAgents.has(agentName)) {
    enabledAgents.delete(agentName);
  } else {
    enabledAgents.add(agentName);
  }

  renderAgentPool();
}

// =====================
// CREATE PLAYER SLOTS
// =====================

function createPlayerSlots() {

  const count = Number(playerCountSelect.value);

  playersContainer.innerHTML = "";

  playerAssignments = [];

  for (let i = 0; i < count; i++) {

    playerAssignments.push({
      locked: false,
      agent: null
    });

    const slot = document.createElement("div");
    slot.classList.add("player-slot");

    slot.innerHTML = `
      <h3>Player ${i + 1}</h3>

      <div class="player-image-container">
        <img class="player-image hidden">
      </div>

      <h2 class="agent-name">---</h2>

      <button class="lock-btn">
        Lock
      </button>
    `;

    const lockBtn = slot.querySelector(".lock-btn");

    lockBtn.addEventListener("click", () => {

      playerAssignments[i].locked =
        !playerAssignments[i].locked;

      lockBtn.classList.toggle("locked");

      if (playerAssignments[i].locked) {
        lockBtn.textContent = "Locked";
        slot.classList.add("locked");
      } else {
        lockBtn.textContent = "Lock";
        slot.classList.remove("locked");
      }
    });

    playersContainer.appendChild(slot);
  }
}

// =====================
// RANDOMIZE
// =====================

function randomizeAgents() {

  let availableAgents = agents.filter(agent => enabledAgents.has(agent.name));

  if (availableAgents.length === 0) {
    alert("No agents available!");
    return;
  }

  const usedAgents = new Set();

  playerAssignments.forEach(player => {
    if (player.locked && player.agent) {
      usedAgents.add(player.agent.name);
    }
  });

  playerAssignments.forEach((player, index) => {

    if (player.locked) return;

    const possibleAgents = availableAgents.filter(agent =>
      !usedAgents.has(agent.name)
    );

    if (possibleAgents.length === 0) return;

    const randomAgent =
      possibleAgents[
        Math.floor(Math.random() * possibleAgents.length)
      ];

    player.agent = randomAgent;

    usedAgents.add(randomAgent.name);

    updatePlayerCard(index, randomAgent);
  });
}

// =====================
// UPDATE PLAYER CARD
// =====================

function updatePlayerCard(index, agent) {

  const slot =
    playersContainer.children[index];

  const img =
    slot.querySelector(".player-image");

  img.src =
    `images/full/${agent.name.toLowerCase()}.webp`;

  img.classList.remove("hidden");

  slot.querySelector(".agent-name").textContent =
    agent.name;
}

// =====================
// EVENTS
// =====================

randomizeBtn.addEventListener("click", randomizeAgents);

playerCountSelect.addEventListener(
  "change",
  createPlayerSlots
);

// =====================
// INIT
// =====================

renderAgentPool();
createPlayerSlots();