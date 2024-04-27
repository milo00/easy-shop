package com.shop.shop.service;

import com.shop.shop.model.Category;
import com.shop.shop.model.Gender;
import com.shop.shop.model.MenuData;
import com.shop.shop.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class MenuDataService {
    private final ItemRepository itemRepository;

    public MenuDataService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    private MenuData.MenuDataInner getChildrenData(MenuData.MenuDataInner parent, String childName) {
        return parent.getData().stream()
                .filter(c -> c.getName().equals(childName))
                .findFirst()
                .orElseGet(() -> {
                    MenuData.MenuDataInner newChild = new MenuData.MenuDataInner(childName, new ArrayList<>());
                    parent.getData().add(newChild);
                    return newChild;
                });
    }

    public MenuData getMenuData() {
        List<Object[]> menuData = itemRepository.findMenuData();
        MenuData resultMenuData = new MenuData();
        Map<String, MenuData.MenuDataInner> genderMap = new LinkedHashMap<>();

        for (Object[] row : menuData) {
            MenuData.MenuDataInner gender;
            if (((String) row[0]).isEmpty()) {
                gender = genderMap.computeIfAbsent(((Gender) row[1]).name(),
                        __ -> new MenuData.MenuDataInner(((Gender) row[1]).name(), new ArrayList<>()));
            } else {
                var additionalInfo = genderMap.computeIfAbsent((String) row[0],
                        __ -> new MenuData.MenuDataInner((String) row[0], new ArrayList<>()));
                gender = getChildrenData(additionalInfo, ((Gender) row[1]).name());
            }

            var category = getChildrenData(gender, ((Category) row[2]).name());
            var subcategory = getChildrenData(category, (String) row[3]);
            subcategory.getData().add(new MenuData.MenuDataInner(((String) row[4]), new ArrayList<>()));
        }

        resultMenuData.setData(new ArrayList<>(genderMap.values()));
        return resultMenuData;
    }
}
