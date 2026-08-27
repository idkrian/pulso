import { useEffect, useState } from "react";
import type { TrainingSplitDto } from "../../dtos/training-splits.dto";
import TrainingSplitCard from "../../components/TrainingSplitCard";
import TrainingSplitCardSkeleton from "../../components/TrainingSplitCardSkeleton";
import ConfirmModal from "../../components/modals/ConfirmModal";
import {
  deleteTrainingSplit,
  getAllUserTrainingSplits,
} from "@/api/training-split";
import { FaPlus } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import { useNavigate } from "react-router";
import { getApiErrorMessage } from "@/utils/error";
import { useT } from "@/i18n";

const SKELETON_COUNT = 4;

const TrainingSplits = () => {
  const navigate = useNavigate();
  const t = useT();
  const [trainingSplits, setTrainingSplits] = useState<TrainingSplitDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<TrainingSplitDto | null>(
    null,
  );
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainingSplits = async () => {
      try {
        const data = await getAllUserTrainingSplits();
        setTrainingSplits(data);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainingSplits();
  }, []);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteTrainingSplit(pendingDelete.id);
      setTrainingSplits((prev) =>
        prev.filter((s) => s.id !== pendingDelete.id),
      );
      setPendingDelete(null);
    } catch (error) {
      setDeleteError(getApiErrorMessage(error));
    } finally {
      setDeleting(false);
    }
  };

  const openDelete = (split: TrainingSplitDto) => {
    setDeleteError(null);
    setPendingDelete(split);
  };

  const closeDelete = () => {
    if (deleting) return;
    setDeleteError(null);
    setPendingDelete(null);
  };

  const isEmpty = !loading && trainingSplits.length === 0;

  return (
    <div className="relative flex w-full flex-col py-4 lg:h-full">
      <ConfirmModal
        open={pendingDelete !== null}
        title={t("trainingSplits.deleteTitle")}
        description={
          pendingDelete
            ? t("trainingSplits.deleteDescription", {
                title: pendingDelete.title,
              })
            : undefined
        }
        error={deleteError}
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={closeDelete}
      />

      {loading && (
        <div className="flex w-full flex-wrap justify-center gap-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <TrainingSplitCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isEmpty && (
        <div className="flex flex-1 flex-col items-center justify-center text-center gap-4 px-6">
          <div className="w-20 h-20 rounded-full bg-mediumGrey flex items-center justify-center">
            <LuClipboardList size={40} className="text-indigo" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-white">
              {t("trainingSplits.emptyTitle")}
            </h2>
            <p className="text-sm text-lightGrey/60 max-w-sm">
              {t("trainingSplits.emptyDescription")}
            </p>
          </div>
          <button
            onClick={() => navigate("/training-splits/create")}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo hover:bg-darkIndigo text-white font-semibold cursor-pointer transition"
          >
            <FaPlus size={14} />
            {t("trainingSplits.create")}
          </button>
        </div>
      )}

      {!loading && !isEmpty && (
        <div className="flex w-full flex-wrap justify-center gap-4">
          {trainingSplits.map((split) => (
            <TrainingSplitCard
              split={split}
              width={300}
              key={split.id}
              onDelete={openDelete}
            />
          ))}
        </div>
      )}

      {!isEmpty && (
        <button
          aria-label={t("trainingSplits.create")}
          className="fixed bottom-[calc(3.5rem+1rem+env(safe-area-inset-bottom))] right-4 z-40 flex items-center justify-center size-14 rounded-full bg-indigo hover:bg-darkIndigo shadow-xl cursor-pointer transition duration-300 hover:-translate-y-1 hover:scale-110 lg:bottom-6 lg:right-6"
          onClick={() => navigate("/training-splits/create")}
        >
          <FaPlus color="white" size={24} />
        </button>
      )}
    </div>
  );
};

export default TrainingSplits;
