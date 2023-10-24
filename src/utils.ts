export function shortenSVGPath(d, c1, c2, desiredLength) {
  const match = d.match(
    /M([-+]?\d*\.\d+|\d+),([-+]?\d*\.\d+|\d+) A0,0 0 0,1 ([-+]?\d*\.\d+|\d+),([-+]?\d*\.\d+|\d+)/
  );

  if (!match) {
    throw new Error("Invalid 'd' parameter");
  }

  const sourceX = parseFloat(match[1]);
  const sourceY = parseFloat(match[2]);
  const targetX = parseFloat(match[3]);
  const targetY = parseFloat(match[4]);

  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const length = Math.sqrt(dx * dx + dy * dy);

  // Calculate the unit vector along the original path
  const unitX = dx / length;
  const unitY = dy / length;

  // Calculate the midpoint between source and target
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  // Calculate the vectors from midpoint to the centers of the circles
  const vectorToC1 = [c1.x - midX, c1.y - midY];
  const vectorToC2 = [c2.x - midX, c2.y - midY];

  // Calculate the unit vectors of the vectorToC1 and vectorToC2
  const lengthToC1 = Math.sqrt(
    vectorToC1[0] * vectorToC1[0] + vectorToC1[1] * vectorToC1[1]
  );
  const unitToC1 = [vectorToC1[0] / lengthToC1, vectorToC1[1] / lengthToC1];

  const lengthToC2 = Math.sqrt(
    vectorToC2[0] * vectorToC2[0] + vectorToC2[1] * vectorToC2[1]
  );
  const unitToC2 = [vectorToC2[0] / lengthToC2, vectorToC2[1] / lengthToC2];

  // Calculate the new path endpoints with the desired length
  const newSourceX = midX + (unitToC1[0] * desiredLength) / 2;
  const newSourceY = midY + (unitToC1[1] * desiredLength) / 2;
  const newTargetX = midX + (unitToC2[0] * desiredLength) / 2;
  const newTargetY = midY + (unitToC2[1] * desiredLength) / 2;

  // Create the new path data
  const newPath = `M${newSourceX},${newSourceY} A0,0 0 0,1 ${newTargetX},${newTargetY}`;

  return newPath;
}
