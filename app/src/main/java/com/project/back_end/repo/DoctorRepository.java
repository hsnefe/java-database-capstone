package com.project.back_end.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.back_end.models.Doctor;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.time.LocalDateTime;
@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    @Query("SELECT d FROM Doctor d WHERE d.email = :email")
    Doctor findByEmail(String email);
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE %:name%")
    List<Doctor> findByNameLike(String name);
    List<Doctor> findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(String name, String specialty);
    List<Doctor> findBySpecialtyIgnoreCase(String specialty);
    @Query("SELECT d FROM Doctor d WHERE d.specialty = :specialty")
    List<Doctor> findBySpecialty(String specialty);
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE %:name% AND d.specialty = :specialty")
    List<Doctor> findByNameLikeAndSpecialty(String name, String specialty);
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE %:name% AND d.specialty = :specialty AND d.email = :email")
    List<Doctor> findByNameLikeAndSpecialtyAndEmail(String name, String specialty, String email);
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE %:name% AND d.specialty = :specialty AND d.email = :email AND d.phone = :phone")
    List<Doctor> findByNameLikeAndSpecialtyAndEmailAndPhone(String name, String specialty, String email, String phone);
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE %:name% AND d.specialty = :specialty AND d.email = :email AND d.phone = :phone AND d.address = :address")
    List<Doctor> findByNameLikeAndSpecialtyAndEmailAndPhoneAndAddress(String name, String specialty, String email, String phone, String address);
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE %:name% AND d.specialty = :specialty AND d.email = :email AND d.phone = :phone AND d.address = :address AND d.password = :password")
    List<Doctor> findByNameLikeAndSpecialtyAndEmailAndPhoneAndAddressAndPassword(String name, String specialty, String email, String phone, String address, String password);
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE %:name% AND d.specialty = :specialty AND d.email = :email AND d.phone = :phone AND d.address = :address AND d.password = :password AND d.username = :username")
    List<Doctor> findByNameLikeAndSpecialtyAndEmailAndPhoneAndAddressAndPasswordAndUsername(String name, String specialty, String email, String phone, String address, String password, String username);
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE %:name% AND d.specialty = :specialty AND d.email = :email AND d.phone = :phone AND d.address = :address AND d.password = :password AND d.username = :username AND d.id = :id")
    List<Doctor> findByNameLikeAndSpecialtyAndEmailAndPhoneAndAddressAndPasswordAndUsernameAndId(String name, String specialty, String email, String phone, String address, String password, String username, Long id);
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE %:name% AND d.specialty = :specialty AND d.email = :email AND d.phone = :phone AND d.address = :address AND d.password = :password AND d.username = :username AND d.id = :id AND d.createdAt = :createdAt")
    List<Doctor> findByNameLikeAndSpecialtyAndEmailAndPhoneAndAddressAndPasswordAndUsernameAndIdAndCreatedAt(String name, String specialty, String email, String phone, String address, String password, String username, Long id, LocalDateTime createdAt);
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE %:name% AND d.specialty = :specialty AND d.email = :email AND d.phone = :phone AND d.address = :address AND d.password = :password AND d.username = :username AND d.id = :id AND d.createdAt = :createdAt AND d.updatedAt = :updatedAt")
    List<Doctor> findByNameLikeAndSpecialtyAndEmailAndPhoneAndAddressAndPasswordAndUsernameAndIdAndCreatedAtAndUpdatedAt(String name, String specialty, String email, String phone, String address, String password, String username, Long id, LocalDateTime createdAt, LocalDateTime updatedAt);
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE %:name% AND d.specialty = :specialty AND d.email = :email AND d.phone = :phone AND d.address = :address AND d.password = :password AND d.username = :username AND d.id = :id AND d.createdAt = :createdAt AND d.updatedAt = :updatedAt AND d.deletedAt = :deletedAt")
    List<Doctor> findByNameLikeAndSpecialtyAndEmailAndPhoneAndAddressAndPasswordAndUsernameAndIdAndCreatedAtAndUpdatedAtAndDeletedAt(String name, String specialty, String email, String phone, String address, String password, String username, Long id, LocalDateTime createdAt, LocalDateTime updatedAt, LocalDateTime deletedAt);
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE %:name% AND d.specialty = :specialty AND d.email = :email AND d.phone = :phone AND d.address = :address AND d.password = :password AND d.username = :username AND d.id = :id AND d.createdAt = :createdAt AND d.updatedAt = :updatedAt AND d.deletedAt = :deletedAt AND d.status = :status")
    List<Doctor> findByNameLikeAndSpecialtyAndEmailAndPhoneAndAddressAndPasswordAndUsernameAndIdAndCreatedAtAndUpdatedAtAndDeletedAtAndStatus(String name, String specialty, String email, String phone, String address, String password, String username, Long id, LocalDateTime createdAt, LocalDateTime updatedAt, LocalDateTime deletedAt, int status);
   // 1. Extend JpaRepository:
//    - The repository extends JpaRepository<Doctor, Long>, which gives it basic CRUD functionality.
//    - This allows the repository to perform operations like save, delete, update, and find without needing to implement these methods manually.
//    - JpaRepository also includes features like pagination and sorting.

// Example: public interface DoctorRepository extends JpaRepository<Doctor, Long> {}

// 2. Custom Query Methods:

//    - **findByEmail**:
//      - This method retrieves a Doctor by their email.
//      - Return type: Doctor
//      - Parameters: String email

//    - **findByNameLike**:
//      - This method retrieves a list of Doctors whose name contains the provided search string (case-sensitive).
//      - The `CONCAT('%', :name, '%')` is used to create a pattern for partial matching.
//      - Return type: List<Doctor>
//      - Parameters: String name

//    - **findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase**:
//      - This method retrieves a list of Doctors where the name contains the search string (case-insensitive) and the specialty matches exactly (case-insensitive).
//      - It combines both fields for a more specific search.
//      - Return type: List<Doctor>
//      - Parameters: String name, String specialty

//    - **findBySpecialtyIgnoreCase**:
//      - This method retrieves a list of Doctors with the specified specialty, ignoring case sensitivity.
//      - Return type: List<Doctor>
//      - Parameters: String specialty

// 3. @Repository annotation:
//    - The @Repository annotation marks this interface as a Spring Data JPA repository.
//    - Spring Data JPA automatically implements this repository, providing the necessary CRUD functionality and custom queries defined in the interface.

}