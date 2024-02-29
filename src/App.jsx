import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleAddTask = (text) => {
    setProjectState((prevProjectState) => {
      const taskId = Math.random();

      const newTask = {
        text: text,
        id: taskId,
        projectId: prevProjectState.selectedProjectId,
      };

      return {
        ...prevProjectState,
        tasks: [...prevProjectState.tasks, newTask],
      };
    });
  };

  const handleDeleteTask = (id) => {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        tasks: prevProjectState.tasks.filter((task) => task.id !== id),
      };
    });
  };

  const handleStartAddProject = () => {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: null,
      };
    });
  };

  const handleSelectProject = (id) => {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: id,
      };
    });
  };

  const handleAddProject = (projectData) => {
    setProjectState((prevProjectState) => {
      const projectId = Math.random();

      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        projects: [...prevProjectState.projects, newProject],
      };
    });
  };

  const handleCancelAddProject = () => {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
      };
    });
  };

  const handleDeleteProject = () => {
    setProjectState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        projects: prevProjectState.projects.filter(
          (project) => project.id !== prevProjectState.selectedProjectId
        ),
      };
    });
  };

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        onAddProject={handleAddProject}
        onCancelAddProject={handleCancelAddProject}
      />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-2 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        projects={projectState.projects}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
