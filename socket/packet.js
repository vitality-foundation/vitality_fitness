export const socketEvents = {
  /** CLIENT → SERVER EVENTS **/

  // Client requests to create a new game room.
  'CS_CreateRoom': 0xff0001,

  // Client requests to join an existing room.
  'CS_JoinRoom': 0xff0002,

  // Client selects a chess/checker piece on the board.
  'CS_SelectPiece': 0xff0003,

  // Client performs a move action for a selected piece.
  'CS_PerformMove': 0xff0004,

  // Client promotes a pawn to a different piece (e.g., Queen).
  'CS_PawnTransform': 0xff0005,

  // Client cancels selection of a piece.
  'CS_UnSelectPiece': 0xff0006,

  // Client logs into the match-based system.
  'CS_MatchPlayLogin': 0xff0007,

  // Client activates a special item/power-up (if supported).
  'CS_ActivateItem': 0xff0008,

  // Client signals they are ready to begin the match.
  'CS_Ready': 0xff0009,

  // Client notifies the server of the currently selected item.
  'CS_CurrentItem': 0xff0010,

  // Client sends a draw request (e.g., offer a draw in chess).
  'CS_SendDrawRequest': 0xff0011,

  // Client responds to a draw request (accept/reject).
  'CS_ReplyDrawRequest': 0xff0012,

  /** SERVER → CLIENT EVENTS **/

  // Server confirms that the room was successfully created.
  'SC_RoomCreated': 0xff1001,

  // Server notifies both players that the game has started.
  'SC_GameStarted': 0xff1002,

  // Server signals that the turn has changed to another player.
  'SC_ChangeTurn': 0xff0103,

  // Server notifies that a player has disconnected/logged out.
  'SC_PlayerLogOut': 0xff1004,

  // Server forces a player to leave the game (e.g., due to violation or timeout).
  'SC_ForceExit': 0xff1005,

  // Server broadcasts the selected piece.
  'SC_SelectPiece': 0xff1006,

  // Server broadcasts a pawn transformation.
  'SC_PawnTransform': 0xff1007,

  // Server broadcasts a move that was performed.
  'SC_PerformMove': 0xff1008,

  // Server notifies to unselect a piece.
  'SC_UnSelectPiece': 0xff0009,

  // Server updates the remaining time for a player.
  'SC_RemainingTime': 0xff0010,

  // Server broadcasts item activation (used in special game modes).
  'SC_ActivateItem': 0xff0011,

  // Server confirms that a player has joined the room.
  'SC_JoinRoom': 0xff0012,

  // Server sends info about items (owned/available) to the player.
  'SC_ItemInfo': 0xff0013,

  // Server relays a draw request from one player to another.
  'SC_SendDrawRequest': 0xff0014,

  // Server confirms that the match has ended in a draw.
  'SC_DrawMatch': 0xff0015,
};
