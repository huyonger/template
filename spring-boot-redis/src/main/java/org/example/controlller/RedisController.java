package org.example.controlller;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.example.entities.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


// NOTE: Student Class Serializer need to implement Parameterless constructor


public @RestController
class RedisController {
    @Autowired
    private RedisTemplate redisTemplate;

    @GetMapping("/redis/string/set")
    public String redisStringSet() {

        redisTemplate.setKeySerializer(new StringRedisSerializer());
        Jackson2JsonRedisSerializer<Object> jackson2RedisSerializer = jackson2JsonRedisSerializer();
        redisTemplate.setValueSerializer(jackson2RedisSerializer);

        ArrayList<Student> students = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
//            Student student = new Student();
//            student.setId(1);
//            student.setName("huyong");
//            student.setAge(23);
            students.add(new Student(1,"huyong",23));
        }

        redisTemplate.opsForValue().set("template_redis_students", students);

        return "success";
    }

    @GetMapping("/redis/string/get")
    public List<Student> redisStringGet() {

        redisTemplate.setKeySerializer(new StringRedisSerializer());
        Jackson2JsonRedisSerializer<Object> jackson2RedisSerializer = jackson2JsonRedisSerializer();
        redisTemplate.setValueSerializer(jackson2RedisSerializer);

        List<Student> students = (ArrayList<Student>) redisTemplate.opsForValue().get("template_redis_students");
        System.out.println(students);
        return students;
    }


    /**
     * redis cast LinkHashMap to ProcessStatus
     *
     * @return
     */

    private Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer() {
        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer =
                new Jackson2JsonRedisSerializer<>(Object.class);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        objectMapper.configure(MapperFeature.USE_ANNOTATIONS, false);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        // 此项必须配置，否则会报java.lang.ClassCastException: java.util.LinkedHashMap cannot be cast to XXX
        objectMapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);
        return jackson2JsonRedisSerializer;
    }
}
