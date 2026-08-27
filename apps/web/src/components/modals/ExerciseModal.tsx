import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import {
  MuscleGroup,
  MusclesByGroup,
  type MuscleGroupType,
} from "@/dtos/muscle.dto";
import { useMuscleGroupLabel, useMusclesByGroup, useT } from "@/i18n";
import type { ExerciseDto } from "@/dtos/exercise.dto";
import { createExercise, updateExercise } from "@/api/exercise";
import { getApiErrorMessage } from "@/utils/error";
import MuscleIcon from "@/components/exercises/MuscleIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FeedbackModal from "./FeedbackModal";

type Props = {
  open: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  initialGroup: MuscleGroupType;
  exercise?: ExerciseDto | null;
};

const ExerciseModal = ({
  open,
  onClose,
  onSuccess,
  initialGroup,
  exercise,
}: Props) => {
  const isEditing = !!exercise;
  const baseGroup = exercise?.muscleGroup ?? initialGroup;
  const t = useT();
  const muscleGroupLabel = useMuscleGroupLabel();
  const musclesByGroup = useMusclesByGroup();

  const [muscleGroup, setMuscleGroup] = useState<MuscleGroupType>(baseGroup);
  const [muscle, setMuscle] = useState(
    exercise?.muscle ?? MusclesByGroup[baseGroup][0],
  );
  const [title, setTitle] = useState(exercise?.title ?? "");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<"success" | "error">(
    "success",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  useEffect(() => {
    const group = exercise?.muscleGroup ?? initialGroup;
    setMuscleGroup(group);
    setMuscle(exercise?.muscle ?? MusclesByGroup[group][0]);
    setTitle(exercise?.title ?? "");
    setDescription("");
  }, [initialGroup, exercise]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onGroupChange = (group: MuscleGroupType) => {
    setMuscleGroup(group);
    setMuscle(MusclesByGroup[group][0]);
  };

  const submit = async () => {
    if (!title.trim() || submitting) return;
    setSubmitting(true);
    try {
      if (isEditing) {
        await updateExercise(exercise.id, {
          muscleGroup,
          muscle,
          title: title.trim(),
        });
      } else {
        await createExercise({
          muscleGroup,
          muscle,
          title: title.trim(),
          description,
        });
      }
      setFeedbackStatus("success");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
      setFeedbackStatus("error");
    } finally {
      setSubmitting(false);
      setFeedbackOpen(true);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <FeedbackModal
        open={feedbackOpen}
        status={feedbackStatus}
        description={
          feedbackStatus === "success"
            ? isEditing
              ? t("exerciseModal.updatedSuccess")
              : t("exerciseModal.createdSuccess")
            : errorMessage ||
              (isEditing
                ? t("exerciseModal.updateError")
                : t("exerciseModal.createError"))
        }
        onClose={() => {
          setFeedbackOpen(false);
          if (feedbackStatus === "success") {
            onSuccess?.();
            onClose?.();
          }
        }}
      />

      <div
        className="flex flex-col w-md max-w-full max-h-[90vh] bg-mediumGrey rounded-2xl shadow-xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-darkGrey">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-darkGrey flex items-center justify-center">
              <MuscleIcon
                group={muscleGroup}
                className="w-7 h-7 object-contain"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-lightGrey/60 font-semibold">
                {isEditing
                  ? t("exerciseModal.editTitle")
                  : t("exerciseModal.newTitle")}
              </p>
              <h2 className="text-lg font-bold leading-tight">
                {muscleGroupLabel(muscleGroup)}
              </h2>
            </div>
          </div>
          <IoClose
            size={22}
            className="cursor-pointer text-lightGrey/70 hover:text-white transition-colors"
            onClick={onClose}
          />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          <Field label={t("exerciseModal.muscleGroup")}>
            <div className="flex flex-wrap gap-2">
              {Object.values(MuscleGroup).map((mg) => {
                const active = mg === muscleGroup;
                return (
                  <button
                    key={mg}
                    type="button"
                    onClick={() => onGroupChange(mg)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      active
                        ? "bg-darkGrey border-indigo text-white"
                        : "bg-darkGrey border-transparent text-lightGrey/80 hover:border-indigo/40 hover:text-white"
                    }`}
                  >
                    <MuscleIcon group={mg} className="w-4 h-4 object-contain" />
                    {muscleGroupLabel(mg)}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label={t("exerciseModal.targetMuscle")}>
            <Select
              value={muscle}
              onValueChange={(value) => setMuscle(value as typeof muscle)}
            >
              <SelectTrigger className="w-full bg-darkGrey border-transparent text-white focus-visible:border-indigo focus-visible:ring-0">
                <SelectValue placeholder={t("exerciseModal.selectMuscle")} />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="bg-darkGrey border-darkGrey"
              >
                {musclesByGroup[muscleGroup].map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label={t("exerciseModal.titleLabel")}>
            <input
              type="text"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("exerciseModal.titlePlaceholder")}
              className="w-full bg-darkGrey rounded-lg px-3 py-2.5 text-sm outline-none border border-transparent focus:border-indigo transition-colors placeholder:text-lightGrey/40"
            />
          </Field>

          {!isEditing && (
            <Field label={t("exerciseModal.descriptionLabel")} optional>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("exerciseModal.descriptionPlaceholder")}
                className="w-full bg-darkGrey rounded-lg px-3 py-2.5 text-sm outline-none border border-transparent focus:border-indigo transition-colors placeholder:text-lightGrey/40 resize-none h-24"
              />
            </Field>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-6 py-4 border-t border-darkGrey">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold bg-darkGrey hover:bg-darkGrey/70 transition-colors cursor-pointer"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={submit}
            disabled={!title.trim() || submitting}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold bg-indigo hover:bg-lightIndigo transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing ? <FiCheck size={14} /> : <FaPlus size={12} />}
            {submitting
              ? isEditing
                ? t("exerciseModal.saving")
                : t("exerciseModal.creating")
              : isEditing
                ? t("exerciseModal.saveChanges")
                : t("exerciseModal.createExercise")}
          </button>
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) => {
  const t = useT();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <p className="text-xs uppercase tracking-wider text-lightGrey/50 font-semibold">
          {label}
        </p>
        {optional && (
          <span className="text-[10px] text-lightGrey/40 normal-case tracking-normal">
            {t("common.optional")}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default ExerciseModal;
