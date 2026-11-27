"use client";
import { useMemo } from "react";
import { ReactFlow, Background, type Node, type Edge } from "@xyflow/react";
import type { CaseState } from "@/lib/types";
import { keyIdentifiers, caseLabel } from "@/lib/evidence";

const nodeStyle = {
  fontFamily: "ui-monospace, monospace",
  fontSize: 11,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: 6,
  background: "#161616",
  color: "#f2f2f0",
  padding: 6,
};

export default function CampaignGraph({ c }: { c: CaseState }) {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const center = caseLabel(c);

    nodes.push({
      id: "target",
      position: { x: 0, y: 0 },
      data: { label: center },
      style: {
        ...nodeStyle,
        background: "#cd0001",
        color: "#fff",
        border: "1px solid #ff4d4d",
        fontWeight: 700,
        boxShadow: "0 0 16px rgba(205, 0, 1, 0.4)",
      },
    });

    // Identifier nodes — skip the one that *is* the input (it's already the center).
    const idents = keyIdentifiers(c).filter((i) => i !== center).slice(0, 8);
    idents.forEach((ident, i) => {
      const id = `ident-${i}`;
      nodes.push({
        id,
        position: { x: -330 + (i % 3) * 330, y: 110 + Math.floor(i / 3) * 70 },
        data: { label: ident },
        style: nodeStyle,
      });
      edges.push({ id: `e-${id}`, source: "target", target: id, style: { stroke: "rgba(255, 255, 255, 0.3)" } });
    });

    c.mapper.sites.slice(0, 10).forEach((s, i) => {
      const id = `site-${i}`;
      nodes.push({
        id,
        position: { x: -330 + (i % 3) * 330, y: 300 + Math.floor(i / 3) * 80 },
        data: { label: hostOf(s.url) ?? s.url },
        style: { ...nodeStyle, borderStyle: s.source === "fetch" ? "solid" : "dashed", borderColor: "#ff6b6b" },
      });
      edges.push({
        id: `e-${id}`,
        source: "target",
        target: id,
        label: s.matchedOn[0],
        labelStyle: { fontSize: 9, fontFamily: "ui-monospace, monospace", fill: "#ff8080" },
        labelBgStyle: { fill: "#161616", fillOpacity: 0.95, stroke: "rgba(255, 255, 255, 0.2)", strokeWidth: 1 },
        labelBgPadding: [6, 3],
        labelBgBorderRadius: 4,
        style: { stroke: "#cd0001" },
      });
    });
    return { nodes, edges };
  }, [c]);

  const empty = nodes.length === 1;

  return (
    <div className="h-80 border border-white/10 bg-[#0d0d0d] rounded-2xl relative overflow-hidden shadow-xl">
      {/* key on node count: nodes stream in over time, and fitView only runs at mount */}
      <ReactFlow
        key={nodes.length}
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        nodesDraggable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#2a2a2a" gap={20} />
      </ReactFlow>
      {empty && c.status !== "running" && (
        <div className="absolute bottom-2 left-3 mono-label text-[var(--muted)]">
          no related identifiers or sites found
        </div>
      )}
    </div>
  );
}

function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}
