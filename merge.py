import re

with open('temp.tsx', 'r', encoding='utf-16le') as f:
    branch = f.read()

with open('src/routes/index.tsx', 'r', encoding='utf-8') as f:
    head = f.read()

# 1. Extract COURSE_LIST
course_list_match = re.search(r'(const COURSE_LIST = \[.*?\];)', branch, re.DOTALL)
course_list = course_list_match.group(1)

# 2. Extract LEVEL_COLOR and CourseModal
level_color_match = re.search(r'(const LEVEL_COLOR.*?};)\n\nfunction CourseModal\(.*?\)\s*{\n.*?\n}', branch, re.DOTALL)
modal_code = level_color_match.group(0)

# 3. Extract selectedCourse state block
state_match = re.search(r'(const \[selectedCourse.*?\]\(\);\n  }, \[\];)', branch, re.DOTALL)
if not state_match:
    # Alternative match
    state_match = re.search(r'(const \[selectedCourse.*?\]\(\);\n  }, \[\];)', branch, re.DOTALL)

state_code = '''  const [selectedCourse, setSelectedCourse] = useState<(typeof COURSE_LIST)[0] | null>(null);
  const [coursesTriggered, setCoursesTriggered] = useState(false);
  const coursesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = coursesRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCoursesTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);'''

# 4. Extract courses section
section_match = re.search(r'(<section id="courses".*?</section>)', branch, re.DOTALL)
courses_section = section_match.group(1)

# 5. Extract CourseModal JSX
modal_jsx = '''      {/* COURSE DETAIL MODAL */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}'''

# MERGE INTO HEAD

# Replace COURSE_LIST
head = re.sub(r'const COURSE_LIST = \[.*?\];', course_list, head, flags=re.DOTALL)

# Replace courses section
head = re.sub(r'<section id="courses".*?</section>', courses_section.replace('\\\\', '\\\\'), head, flags=re.DOTALL)

# Insert LEVEL_COLOR and CourseModal
head = head.replace('function Home() {', modal_code + '\n\nfunction Home() {')

# Insert state hooks
head = head.replace('const [showAllCourses, setShowAllCourses] = useState(false);', 'const [showAllCourses, setShowAllCourses] = useState(false);\n' + state_code)

# Insert modal JSX
head = head.replace('</main>', '</main>\n\n' + modal_jsx)

with open('src/routes/index.tsx', 'w', encoding='utf-8') as f:
    f.write(head)

print("Merge done!")
