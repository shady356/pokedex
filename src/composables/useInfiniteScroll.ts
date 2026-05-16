import { ref, nextTick, onBeforeUnmount, markRaw, type Ref } from "vue";

export function useInfiniteScroll(
  trigger: Ref<Element | null>,
  listLength: Ref<number>,
  batchSize: number,
  onLoadBatch: (start: number, end: number) => Promise<void>,
) {
  const visibleCount = ref(0);
  const isLoadingBatch = ref(false);
  let _observer: IntersectionObserver | null = null;

  async function loadNextBatch() {
    if (isLoadingBatch.value) return;
    const start = visibleCount.value;
    const end = Math.min(start + batchSize, listLength.value);
    if (start >= end) return;

    isLoadingBatch.value = true;
    visibleCount.value = end;
    await onLoadBatch(start, end);
    isLoadingBatch.value = false;

    await nextTick();
    const rect = trigger.value?.getBoundingClientRect();
    if (rect && rect.top < window.innerHeight) loadNextBatch();
  }

  function restart() {
    _observer?.disconnect();
    visibleCount.value = 0;
    isLoadingBatch.value = false;
    _observer = markRaw(
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) loadNextBatch();
      }),
    );
    nextTick(() => {
      if (trigger.value) _observer!.observe(trigger.value);
    });
  }

  onBeforeUnmount(() => {
    _observer?.disconnect();
  });

  return { visibleCount, restart };
}
