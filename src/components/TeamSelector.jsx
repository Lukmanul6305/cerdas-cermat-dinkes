import {
    DndContext,
    closestCenter,
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
    sortableKeyboardCoordinates,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Ikon 9 titik (grip 3x3)
function GripIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            {[6, 12, 18].flatMap((cx) =>
                [6, 12, 18].map((cy) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.8" />
                ))
            )}
        </svg>
    );
}

function SortableTeam({ team, isSelected, onSelect }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: team.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative w-44 shrink-0 sm:w-52 ${isDragging ? "z-10 opacity-80" : ""
                }`}
        >
            {/* Tombol pilih tim */}
            <button
                type="button"
                onClick={() => onSelect(team.id)}
                aria-pressed={isSelected}
                className={`w-full rounded-xl border-2 py-4 pl-4 pr-11 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${isSelected
                    ? "border-amber-400 bg-amber-400/15"
                    : "border-slate-700 bg-slate-900/60 hover:border-teal-500/60"
                    }`}
            >
                <p className="text-sm font-bold text-white truncate">{team.name}</p>
                <p className="mt-1 text-xs font-semibold text-slate-400">
                    {isSelected ? "Terpilih" : "Klik untuk memilih"}
                </p>
            </button>

            {/* Handle 9 titik: tahan lalu geser kiri/kanan */}
            <button
                type="button"
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
                aria-label={`Pindahkan posisi ${team.name}`}
                title="Tahan lalu geser untuk memindah posisi"
                className="absolute p-1.5 rounded-lg cursor-grab touch-none right-2 top-2 text-slate-400 hover:bg-slate-700 hover:text-white active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
                <GripIcon />
            </button>
        </div>
    );
}

export default function TeamSelector({ teams, selectedTeamId, onSelectTeam, onReorder }) {
    const selected = teams.find((t) => t.id === selectedTeamId);

    const sensors = useSensors(
        // distance: klik biasa tidak dianggap drag
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = ({ active, over }) => {
        if (over && active.id !== over.id) onReorder(active.id, over.id);
    };

    return (
        <section aria-label="Pilih tim" className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h2 className="text-lg font-bold text-white">1. Pilih Tim</h2>
                <span
                    className={`text-xs font-semibold ${selected ? "text-teal-300" : "text-amber-400"
                        }`}
                >
                    {selected
                        ? `Giliran memilih: ${selected.name}`
                        : "Belum ada tim yang dipilih"}
                </span>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={teams.map((t) => t.id)}
                    strategy={horizontalListSortingStrategy}
                >
                    <div className="flex gap-3 pb-3 overflow-x-auto">
                        {teams.map((team) => (
                            <SortableTeam
                                key={team.id}
                                team={team}
                                isSelected={team.id === selectedTeamId}
                                onSelect={onSelectTeam}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </section>
    );
}