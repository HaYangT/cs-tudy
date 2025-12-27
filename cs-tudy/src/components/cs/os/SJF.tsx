import React, { useRef, useEffect, useState } from "react";
import "./styles/SJF.css";
interface Process {
  id: string;
  arrival: number;
  burst: number;
  remaining: number;
  color: string;
  isQueued: boolean;
}

const SJF: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pId, setPId] = useState("P1");
  const [pArrival, setPArrival] = useState(0);
  const [pBurst, setPBurst] = useState(10);

  const processes = useRef<Process[]>([]);
  const readyQueue = useRef<Process[]>([]);
  const runningProcess = useRef<Process | null>(null);
  const currentTime = useRef(0);
  const animationRef = useRef<number>(null);

  const addProcess = () => {
    const newProcess: Process = {
      id: pId,
      arrival: pArrival,
      burst: pBurst,
      remaining: pBurst,
      color: `hsla(${Math.random() * 360}, 60%, 50%, 0.8)`,
      isQueued: false,
    };
    processes.current.push(newProcess);
    setPId(`P${processes.current.length + 1}`);
  };

  const toggleSimulation = () => setIsPlaying(!isPlaying);

  const resetSimulation = () => {
    setIsPlaying(false);
    processes.current = [];
    readyQueue.current = [];
    runningProcess.current = null;
    currentTime.current = 0;
    setPId("P1");
  };

  const sortReadyQueue = () => {
    readyQueue.current.sort((a, b) => a.burst - b.burst);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateArrival = () => {
      const arrived = processes.current.filter((p) => p.arrival <= currentTime.current && !p.isQueued);

      arrived.forEach((p) => {
        p.isQueued = true;
        readyQueue.current.push(p);
      });

      if (arrived.length > 0) {
        sortReadyQueue();
      }
    };
    const updateExecution = () => {
      if (!runningProcess.current && readyQueue.current.length > 0) {
        runningProcess.current = readyQueue.current.shift() || null;
      }

      if (runningProcess.current) {
        runningProcess.current.remaining -= 0.016;
        if (runningProcess.current.remaining <= 0) {
          runningProcess.current = null;
        }
      }

      currentTime.current += 0.016;
    };

    const draw = () => {
      updateArrival();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "22px THE_Nakseo";
      ctx.fillStyle = "#444";
      ctx.fillText(`현재 시간: ${currentTime.current.toFixed(1)}s`, 10, 30);
      ctx.fillText(isPlaying ? "재생 중..." : "일시 정지", 200, 30);

      // --- Ready Queue ---
      ctx.fillText("대기 중인 프로세스 (Ready Queue)", 10, 80);

      const boxSize = 100;
      const gap = 10;
      const itemsPerRow = 7; // 한 줄에 표시할 개수

      readyQueue.current.forEach((p, i) => {
        // i가 7이면 row는 1, i가 0~6이면 row는 0
        const row = Math.floor(i / itemsPerRow);
        const col = i % itemsPerRow;

        // 좌표 계산
        const x = 10 + col * (boxSize + gap);
        const y = 100 + row * (boxSize + gap);

        // 상자 그리기
        ctx.fillStyle = p.color;
        ctx.fillRect(x, y, boxSize, boxSize);

        ctx.strokeStyle = "#555";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, boxSize, boxSize);

        // 텍스트 그리기
        ctx.fillStyle = "black";
        ctx.fillText(p.id, x + 15, y + 38);

        ctx.fillStyle = "black";
        ctx.fillText(`B: ${p.burst}`, x + 15, y + 60);
      });

      // --- CPU 박스 ---
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]); // 점선 효과로 낙서 느낌 추가
      ctx.strokeRect(700, 80, 120, 120);
      ctx.setLineDash([]); // 점선 해제
      ctx.fillStyle = "#333";
      ctx.fillText("CPU", 740, 70);
      if (runningProcess.current) {
        ctx.fillStyle = runningProcess.current.color;
        ctx.fillRect(710, 90, 100, 100);
        ctx.fillStyle = "black";
        ctx.fillText(runningProcess.current.id, 745, 140);
        ctx.font = "16px THE_Nakseo";
        ctx.fillText(`${runningProcess.current.remaining.toFixed(1)}s`, 745, 165);
      }
      if (isPlaying) updateExecution();
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="notebook">
      <div className="controls">
        <input type="text" value={pId} onChange={(e) => setPId(e.target.value)} placeholder="ID" />
        <input
          type="number"
          value={pArrival}
          onChange={(e) => setPArrival(Number(e.target.value))}
          placeholder="도착"
        />
        <input type="number" value={pBurst} onChange={(e) => setPBurst(Number(e.target.value))} placeholder="실행" />
        <button onClick={addProcess}>추가</button>
        <button onClick={toggleSimulation} style={{ backgroundColor: isPlaying ? "#ffeded" : "#edffed" }}>
          {isPlaying ? "일시정지" : "시작"}
        </button>
        <button onClick={resetSimulation}>초기화</button>
      </div>

      <canvas ref={canvasRef} width={1500} height={400} style={{ display: "block", marginTop: "20px" }} />
    </div>
  );
};

export default SJF;
