"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useRef, useState } from "react";

type ItemType = "Fruit" | "Vegetable";

interface TodoItem {
  type: ItemType;
  name: string;
  timeLeft?: number;
  timerId?: NodeJS.Timeout;
}

const INITIAL_ITEMS: TodoItem[] = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

const COUNTDOWN_DURATION = 5;

export default function TodoList() {
  const [mainList, setMainList] = useState<TodoItem[]>(INITIAL_ITEMS);
  const [fruitItems, setFruitItems] = useState<TodoItem[]>([]);
  const [vegetableItems, setVegetableItems] = useState<TodoItem[]>([]);
  const lastUpdateTimeRef = useRef<number>(Date.now());

  const clearTimer = useCallback((item: TodoItem) => {
    if (item.timerId) {
      clearTimeout(item.timerId);
    }
  }, []);

  const returnToMainList = useCallback(
    (item: TodoItem) => {
      clearTimer(item);

      const { timerId, ...itemWithoutTimer } = item;
      setMainList((prev) => [...prev, itemWithoutTimer]);

      if (item.type === "Fruit") {
        setFruitItems((prev) => prev.filter((i) => i.name !== item.name));
      } else {
        setVegetableItems((prev) => prev.filter((i) => i.name !== item.name));
      }
    },
    [clearTimer]
  );

  const moveToTypeColumn = useCallback(
    (item: TodoItem, index: number) => {
      setMainList((prev) => prev.filter((_, i) => i !== index));

      const timerId = setTimeout(
        () => returnToMainList({ ...item, timerId: undefined }),
        COUNTDOWN_DURATION * 1000
      );

      const itemWithTimer = {
        ...item,
        timeLeft: COUNTDOWN_DURATION,
        timerId,
      };

      if (item.type === "Fruit") {
        setFruitItems((prev) => [...prev, itemWithTimer]);
      } else {
        setVegetableItems((prev) => [...prev, itemWithTimer]);
      }
    },
    [returnToMainList]
  );

  const updateTimers = useCallback(() => {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - lastUpdateTimeRef.current) / 1000);
    lastUpdateTimeRef.current = now;

    if (elapsedSeconds <= 0) return;

    setFruitItems((prev) =>
      prev.map((item) => ({
        ...item,
        timeLeft: Math.max(
          0,
          (item.timeLeft ?? COUNTDOWN_DURATION) - elapsedSeconds
        ),
      }))
    );

    setVegetableItems((prev) =>
      prev.map((item) => ({
        ...item,
        timeLeft: Math.max(
          0,
          (item.timeLeft ?? COUNTDOWN_DURATION) - elapsedSeconds
        ),
      }))
    );
  }, []);

  const renderItemButton = (item: TodoItem, onClick: () => void) => {
    updateTimers();

    return (
      <Button
        key={item.name}
        variant={"outline"}
        className={`w-full justify-start`}
        onClick={onClick}
      >
        {item.name}
      </Button>
    );
  };

  const renderCategoryCard = (title: string) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {(title === "Fruit" ? fruitItems : vegetableItems).map((item) =>
            renderItemButton(item, () => returnToMainList(item))
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Todo List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Main List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mainList.map((item, index) =>
                renderItemButton(item, () => moveToTypeColumn(item, index))
              )}
            </div>
          </CardContent>
        </Card>
        {renderCategoryCard("Fruit")}
        {renderCategoryCard("Vegetable")}
      </div>
    </div>
  );
}
