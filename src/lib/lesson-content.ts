import { ModuleData, Lesson, MODULES_LIST } from "@/components/landing/curriculum";
import { resolveLessonContent } from "./lessons/registry";
import { DetailedLessonContent, QuizItem } from "./lessons/types";

export * from "./lessons";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export function getLessonPath(module: ModuleData, lesson: Lesson): string {
  const modSlug = `${module.num}-${slugify(module.title)}`;
  const lesSlug = `${lesson.id.replace(/^0+/, "")}-${slugify(lesson.title)}`;
  return `curriculum/${modSlug}/${lesSlug}`;
}

export function resolveLessonFromParams(
  pathParam: string | null,
  moduleParam: string | null,
  lessonParam: string | null,
  titleParam?: string | null,
  techParam?: string | null,
  typeParam?: string | null
): { module: ModuleData; lesson: Lesson } {
  const cleanTitle = titleParam ? decodeURIComponent(titleParam).trim() : null;
  const cleanLesson = lessonParam ? decodeURIComponent(lessonParam).trim() : null;
  const cleanModule = moduleParam ? decodeURIComponent(moduleParam).trim() : null;

  // 1. Search by exact or partial title if provided
  if (cleanTitle) {
    const titleLower = cleanTitle.toLowerCase();
    for (const mod of MODULES_LIST) {
      for (const les of mod.lessons) {
        if (
          les.title.toLowerCase() === titleLower ||
          les.title.toLowerCase().includes(titleLower) ||
          titleLower.includes(les.title.toLowerCase()) ||
          slugify(les.title) === slugify(cleanTitle)
        ) {
          return { module: mod, lesson: les };
        }
      }
    }
  }

  // 2. If path is provided (e.g., 'curriculum/01-python-foundations/01-python-and-apis')
  if (pathParam) {
    const cleanPath = decodeURIComponent(pathParam);
    const parts = cleanPath.split("/").filter(Boolean);
    const lessonPart = parts[parts.length - 1];
    const modulePart = parts.length > 1 ? parts[parts.length - 2] : null;

    if (modulePart) {
      const mod = MODULES_LIST.find(
        (m) =>
          cleanPath.toLowerCase().includes(slugify(m.title)) ||
          cleanPath.toLowerCase().includes(m.num.toLowerCase())
      );
      if (mod) {
        for (const les of mod.lessons) {
          const lesSlug = slugify(les.title);
          if (cleanPath.toLowerCase().includes(lesSlug) || (lessonPart && lessonPart.includes(les.id))) {
            return { module: mod, lesson: les };
          }
        }
        return { module: mod, lesson: mod.lessons[0] };
      }
    }

    // Fallback search across all lessons
    for (const mod of MODULES_LIST) {
      for (const les of mod.lessons) {
        const lesSlug = slugify(les.title);
        if (cleanPath.toLowerCase().includes(lesSlug) || (lessonPart && lessonPart.includes(les.id))) {
          return { module: mod, lesson: les };
        }
      }
    }
  }

  // 3. If module & lesson query params are provided
  if (cleanModule || cleanLesson) {
    const targetModule =
      MODULES_LIST.find(
        (m) => m.num === cleanModule || m.id === cleanModule || slugify(m.title) === slugify(cleanModule || "")
      ) || MODULES_LIST[0];

    if (cleanLesson) {
      const targetLesson = targetModule.lessons.find(
        (l) => l.id === cleanLesson || slugify(l.title) === slugify(cleanLesson) || l.title.toLowerCase().includes(cleanLesson.toLowerCase())
      );
      if (targetLesson) return { module: targetModule, lesson: targetLesson };

      // Search across all modules for this lesson ID
      for (const mod of MODULES_LIST) {
        const found = mod.lessons.find(
          (l) => l.id === cleanLesson || slugify(l.title) === slugify(cleanLesson)
        );
        if (found) return { module: mod, lesson: found };
      }
    }

    return { module: targetModule, lesson: targetModule.lessons[0] };
  }

  // 4. If titleParam was passed but not found in pre-built MODULES_LIST, dynamically synthesize matching module
  if (cleanTitle) {
    const dynamicLesson: Lesson = {
      id: cleanLesson || "OV-01",
      title: cleanTitle,
      duration: "25:00",
      type: typeParam || "Build",
      tech: techParam || "Python"
    };

    const matchedMod = MODULES_LIST[0];
    return {
      module: {
        ...matchedMod,
        lessons: [dynamicLesson, ...matchedMod.lessons]
      },
      lesson: dynamicLesson
    };
  }

  // Default fallback to first module and lesson
  const defaultModule = MODULES_LIST[0];
  return { module: defaultModule, lesson: defaultModule.lessons[0] };
}

export function generateDetailedLessonContent(
  module: ModuleData,
  lesson: Lesson
): DetailedLessonContent {
  return resolveLessonContent(module, lesson);
}
