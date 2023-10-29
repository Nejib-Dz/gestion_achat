package net.gestionachat.controller;

import java.util.List;



import lombok.RequiredArgsConstructor;




import org.springframework.web.bind.annotation.*;

import net.gestionachat.dto.UserDto;
import net.gestionachat.service.interFace.UserService;



@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins ="http://localhost:4200")
public class UserController {


	private final UserService userService;


	  @PostMapping("/createUser")
	    public UserDto createAdmin(@RequestBody UserDto UserDto) {

		  return userService.save(UserDto);
	    }


	    @GetMapping("/findByIdUser/{id}")
	    public UserDto findById(@PathVariable Integer id) {
	        return userService.findById(id);
	    }
		@GetMapping("/findByEmail/{email}")
	    public UserDto findByEmail(@PathVariable String email) {
	        return userService.findByEmail(email);
	    }


		  @GetMapping("/findAllUser")
		  public List<UserDto> findAll() { return
				  userService.findAll(); }

	    @DeleteMapping("/removeUser/{id}")
	    public void delete(@PathVariable("id") Integer id) {
			userService.delete(id);
	    }



	@PutMapping("/updateuser")
	public UserDto UpdatUserDto(@RequestBody UserDto dto) {
		return userService.updateUser(dto);
	}



}
