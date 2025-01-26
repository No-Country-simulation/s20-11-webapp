package no.country.eduplanner.students;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.shared.application.events.StudentRegistrationSucceedEvent;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    @ApplicationModuleListener
    public void onStudentRegistrationSucceed(StudentRegistrationSucceedEvent event) {
        log.info("👨‍🎓 Student {} registered for course {}. Loading student data into db...", event.email(), event.courseName());

        Student student = Student.builder()
                                 .userId(event.userId())
                                 .build();

        studentRepository.save(student);
    }
}