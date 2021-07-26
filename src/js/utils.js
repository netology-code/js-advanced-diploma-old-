export function calcTileType(index, boardSize) {
  if (index === 0) {
    return 'top-left';
  }
  if (index === boardSize - 1) {
    return 'top-right';
  }
  if (index === boardSize ** 2 - boardSize) {
    return 'bottom-left';
  } if (index === boardSize ** 2 - 1) {
    return 'bottom-right';
  } if (index > 0 && index < boardSize - 1) {
    return 'top';
  } if (index > boardSize ** 2 - boardSize && index < boardSize ** 2 - 1) {
    return 'bottom';
  }
  for (let i = boardSize; i < boardSize ** 2; i += boardSize) {
    if (index === i && index !== boardSize ** 2 - boardSize) {
      return 'left';
    } if (index === i - 1 && index !== boardSize) {
      return 'right';
    }
  }

  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
